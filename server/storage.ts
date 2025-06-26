import {
  users,
  properties,
  analytics,
  tutorials,
  tutorialProgress,
  aiChatMessages,
  type User,
  type UpsertUser,
  type Property,
  type InsertProperty,
  type Analytics,
  type InsertAnalytics,
  type Tutorial,
  type InsertTutorial,
  type TutorialProgress,
  type InsertTutorialProgress,
  type AiChatMessage,
  type InsertAiChatMessage,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or, gte, lte, desc, sql, ilike } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Property operations
  createProperty(property: InsertProperty): Promise<Property>;
  getProperties(filters?: {
    search?: string;
    propertyType?: string;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    city?: string;
    state?: string;
    agentId?: string;
    limit?: number;
    offset?: number;
  }): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  updateProperty(id: number, updates: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  getPropertiesByAgent(agentId: string): Promise<Property[]>;

  // Analytics operations
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  getAnalyticsByUser(userId: string, filters?: {
    metricName?: string;
    propertyId?: number;
    startDate?: Date;
    endDate?: Date;
  }): Promise<Analytics[]>;
  getUserDashboardStats(userId: string): Promise<{
    totalProperties: number;
    totalRevenue: number;
    occupancyRate: number;
    avgResponseTime: number;
  }>;

  // Tutorial operations
  getTutorials(filters?: {
    difficulty?: string;
    category?: string;
    limit?: number;
    offset?: number;
  }): Promise<Tutorial[]>;
  getTutorial(id: number): Promise<Tutorial | undefined>;
  getUserTutorialProgress(userId: string): Promise<(TutorialProgress & { tutorial: Tutorial })[]>;
  upsertTutorialProgress(progress: InsertTutorialProgress): Promise<TutorialProgress>;

  // AI Chat operations
  createChatMessage(message: InsertAiChatMessage): Promise<AiChatMessage>;
  getUserChatHistory(userId: string, limit?: number): Promise<AiChatMessage[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Property operations
  async createProperty(property: InsertProperty): Promise<Property> {
    const [result] = await db.insert(properties).values(property).returning();
    return result;
  }

  async getProperties(filters: {
    search?: string;
    propertyType?: string;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    city?: string;
    state?: string;
    agentId?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<Property[]> {
    const conditions = [];
    
    if (filters.search) {
      conditions.push(
        sql`(${properties.title} ILIKE ${`%${filters.search}%`} OR ${properties.description} ILIKE ${`%${filters.search}%`} OR ${properties.address} ILIKE ${`%${filters.search}%`})`
      );
    }
    
    if (filters.propertyType) {
      conditions.push(eq(properties.propertyType, filters.propertyType as any));
    }
    
    if (filters.status) {
      conditions.push(eq(properties.status, filters.status as any));
    }
    
    if (filters.minPrice) {
      conditions.push(gte(properties.price, filters.minPrice.toString()));
    }
    
    if (filters.maxPrice) {
      conditions.push(lte(properties.price, filters.maxPrice.toString()));
    }
    
    if (filters.bedrooms) {
      conditions.push(eq(properties.bedrooms, filters.bedrooms));
    }
    
    if (filters.bathrooms) {
      conditions.push(eq(properties.bathrooms, filters.bathrooms.toString()));
    }
    
    if (filters.city) {
      conditions.push(eq(properties.city, filters.city));
    }
    
    if (filters.state) {
      conditions.push(eq(properties.state, filters.state));
    }
    
    if (filters.agentId) {
      conditions.push(eq(properties.agentId, filters.agentId));
    }

    let query = db.select().from(properties);
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query.orderBy(desc(properties.createdAt));
    
    if (filters.offset) {
      query = query.offset(filters.offset);
    }
    
    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    return await query;
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [result] = await db.select().from(properties).where(eq(properties.id, id));
    return result;
  }

  async updateProperty(id: number, updates: Partial<InsertProperty>): Promise<Property | undefined> {
    const cleanUpdates = { ...updates };
    delete (cleanUpdates as any).id;
    delete (cleanUpdates as any).createdAt;
    
    const [result] = await db
      .update(properties)
      .set({ ...cleanUpdates, updatedAt: new Date() })
      .where(eq(properties.id, id))
      .returning();
    return result;
  }

  async deleteProperty(id: number): Promise<boolean> {
    const result = await db.delete(properties).where(eq(properties.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getPropertiesByAgent(agentId: string): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.agentId, agentId)).orderBy(desc(properties.createdAt));
  }

  // Analytics operations
  async createAnalytics(analyticsData: InsertAnalytics): Promise<Analytics> {
    const [result] = await db.insert(analytics).values(analyticsData).returning();
    return result;
  }

  async getAnalyticsByUser(userId: string, filters: {
    metricName?: string;
    propertyId?: number;
    startDate?: Date;
    endDate?: Date;
  } = {}): Promise<Analytics[]> {
    const conditions = [eq(analytics.userId, userId)];

    if (filters.metricName) {
      conditions.push(eq(analytics.metricName, filters.metricName));
    }

    if (filters.propertyId) {
      conditions.push(eq(analytics.propertyId, filters.propertyId));
    }

    if (filters.startDate) {
      conditions.push(gte(analytics.createdAt, filters.startDate));
    }

    if (filters.endDate) {
      conditions.push(lte(analytics.createdAt, filters.endDate));
    }

    return await db
      .select()
      .from(analytics)
      .where(and(...conditions))
      .orderBy(desc(analytics.createdAt));
  }

  async getUserDashboardStats(userId: string): Promise<{
    totalProperties: number;
    totalRevenue: number;
    occupancyRate: number;
    avgResponseTime: number;
  }> {
    // Get properties count for the user
    const propertiesCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(properties)
      .where(eq(properties.agentId, userId));

    // Get revenue analytics
    const revenueAnalytics = await db
      .select({ 
        total: sql<number>`sum(cast(${analytics.metricValue} as decimal))` 
      })
      .from(analytics)
      .where(and(
        eq(analytics.userId, userId),
        eq(analytics.metricName, 'revenue')
      ));

    // Get occupancy rate
    const occupancyAnalytics = await db
      .select({ 
        avg: sql<number>`avg(cast(${analytics.metricValue} as decimal))` 
      })
      .from(analytics)
      .where(and(
        eq(analytics.userId, userId),
        eq(analytics.metricName, 'occupancy_rate')
      ));

    // Get response time
    const responseTimeAnalytics = await db
      .select({ 
        avg: sql<number>`avg(cast(${analytics.metricValue} as decimal))` 
      })
      .from(analytics)
      .where(and(
        eq(analytics.userId, userId),
        eq(analytics.metricName, 'response_time')
      ));

    return {
      totalProperties: propertiesCount[0]?.count || 0,
      totalRevenue: revenueAnalytics[0]?.total || 0,
      occupancyRate: occupancyAnalytics[0]?.avg || 0,
      avgResponseTime: responseTimeAnalytics[0]?.avg || 0,
    };
  }

  // Tutorial operations
  async getTutorials(filters: {
    difficulty?: string;
    category?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<Tutorial[]> {
    const conditions = [];

    if (filters.difficulty) {
      conditions.push(eq(tutorials.difficulty, filters.difficulty as any));
    }

    if (filters.category) {
      conditions.push(eq(tutorials.category, filters.category));
    }

    let query = db.select().from(tutorials);

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query.orderBy(desc(tutorials.createdAt));

    if (filters.offset) {
      query = query.offset(filters.offset);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    return await query;
  }

  async getTutorial(id: number): Promise<Tutorial | undefined> {
    const [result] = await db.select().from(tutorials).where(eq(tutorials.id, id));
    return result;
  }

  async getUserTutorialProgress(userId: string): Promise<(TutorialProgress & { tutorial: Tutorial })[]> {
    const result = await db
      .select({
        id: tutorialProgress.id,
        userId: tutorialProgress.userId,
        tutorialId: tutorialProgress.tutorialId,
        progressPercent: tutorialProgress.progressPercent,
        completed: tutorialProgress.completed,
        completedAt: tutorialProgress.completedAt,
        createdAt: tutorialProgress.createdAt,
        updatedAt: tutorialProgress.updatedAt,
        tutorial: tutorials,
      })
      .from(tutorialProgress)
      .innerJoin(tutorials, eq(tutorialProgress.tutorialId, tutorials.id))
      .where(eq(tutorialProgress.userId, userId))
      .orderBy(desc(tutorialProgress.updatedAt));

    return result as (TutorialProgress & { tutorial: Tutorial })[];
  }

  async upsertTutorialProgress(progressData: InsertTutorialProgress): Promise<TutorialProgress> {
    const [result] = await db
      .insert(tutorialProgress)
      .values(progressData)
      .onConflictDoUpdate({
        target: [tutorialProgress.userId, tutorialProgress.tutorialId],
        set: {
          progressPercent: progressData.progressPercent,
          completed: progressData.completed,
          completedAt: progressData.completed ? new Date() : null,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result;
  }

  // AI Chat operations
  async createChatMessage(message: InsertAiChatMessage): Promise<AiChatMessage> {
    const [result] = await db.insert(aiChatMessages).values(message).returning();
    return result;
  }

  async getUserChatHistory(userId: string, limit: number = 50): Promise<AiChatMessage[]> {
    return await db
      .select()
      .from(aiChatMessages)
      .where(eq(aiChatMessages.userId, userId))
      .orderBy(desc(aiChatMessages.createdAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();