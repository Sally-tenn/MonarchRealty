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
import { eq, and, desc, sql, ilike, gte, lte, count } from "drizzle-orm";

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
    const [newProperty] = await db.insert(properties).values(property).returning();
    return newProperty;
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
    let query = db.select().from(properties);
    
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
      conditions.push(gte(properties.bedrooms, filters.bedrooms));
    }
    
    if (filters.bathrooms) {
      conditions.push(gte(properties.bathrooms, filters.bathrooms.toString()));
    }
    
    if (filters.city) {
      conditions.push(ilike(properties.city, `%${filters.city}%`));
    }
    
    if (filters.state) {
      conditions.push(eq(properties.state, filters.state));
    }
    
    if (filters.agentId) {
      conditions.push(eq(properties.agentId, filters.agentId));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query.orderBy(desc(properties.createdAt));

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.offset(filters.offset);
    }

    return await query;
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property;
  }

  async updateProperty(id: number, updates: Partial<InsertProperty>): Promise<Property | undefined> {
    const [property] = await db
      .update(properties)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(properties.id, id))
      .returning();
    return property;
  }

  async deleteProperty(id: number): Promise<boolean> {
    const result = await db.delete(properties).where(eq(properties.id, id));
    return result.rowCount > 0;
  }

  async getPropertiesByAgent(agentId: string): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.agentId, agentId)).orderBy(desc(properties.createdAt));
  }

  // Analytics operations
  async createAnalytics(analyticsData: InsertAnalytics): Promise<Analytics> {
    const [newAnalytics] = await db.insert(analytics).values(analyticsData).returning();
    return newAnalytics;
  }

  async getAnalyticsByUser(userId: string, filters: {
    metricName?: string;
    propertyId?: number;
    startDate?: Date;
    endDate?: Date;
  } = {}): Promise<Analytics[]> {
    let query = db.select().from(analytics).where(eq(analytics.userId, userId));
    
    const conditions = [eq(analytics.userId, userId)];
    
    if (filters.metricName) {
      conditions.push(eq(analytics.metricName, filters.metricName));
    }
    
    if (filters.propertyId) {
      conditions.push(eq(analytics.propertyId, filters.propertyId));
    }
    
    if (filters.startDate) {
      conditions.push(gte(analytics.metricDate, filters.startDate));
    }
    
    if (filters.endDate) {
      conditions.push(lte(analytics.metricDate, filters.endDate));
    }

    return await db.select().from(analytics).where(and(...conditions)).orderBy(desc(analytics.metricDate));
  }

  async getUserDashboardStats(userId: string): Promise<{
    totalProperties: number;
    totalRevenue: number;
    occupancyRate: number;
    avgResponseTime: number;
  }> {
    // Get total properties
    const [totalPropertiesResult] = await db
      .select({ count: count() })
      .from(properties)
      .where(eq(properties.agentId, userId));
    
    // Get recent revenue analytics
    const revenueAnalytics = await db
      .select()
      .from(analytics)
      .where(and(
        eq(analytics.userId, userId),
        eq(analytics.metricName, 'monthly_revenue')
      ))
      .orderBy(desc(analytics.metricDate))
      .limit(1);
    
    // Get occupancy rate
    const occupancyAnalytics = await db
      .select()
      .from(analytics)
      .where(and(
        eq(analytics.userId, userId),
        eq(analytics.metricName, 'occupancy_rate')
      ))
      .orderBy(desc(analytics.metricDate))
      .limit(1);
    
    // Get response time
    const responseTimeAnalytics = await db
      .select()
      .from(analytics)
      .where(and(
        eq(analytics.userId, userId),
        eq(analytics.metricName, 'avg_response_time')
      ))
      .orderBy(desc(analytics.metricDate))
      .limit(1);

    return {
      totalProperties: totalPropertiesResult.count,
      totalRevenue: revenueAnalytics[0] ? parseFloat(revenueAnalytics[0].metricValue) : 0,
      occupancyRate: occupancyAnalytics[0] ? parseFloat(occupancyAnalytics[0].metricValue) : 0,
      avgResponseTime: responseTimeAnalytics[0] ? parseFloat(responseTimeAnalytics[0].metricValue) : 0,
    };
  }

  // Tutorial operations
  async getTutorials(filters: {
    difficulty?: string;
    category?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<Tutorial[]> {
    let query = db.select().from(tutorials);
    
    const conditions = [];
    
    if (filters.difficulty) {
      conditions.push(eq(tutorials.difficulty, filters.difficulty as any));
    }
    
    if (filters.category) {
      conditions.push(eq(tutorials.category, filters.category));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    query = query.orderBy(desc(tutorials.createdAt));

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.offset(filters.offset);
    }

    return await query;
  }

  async getTutorial(id: number): Promise<Tutorial | undefined> {
    const [tutorial] = await db.select().from(tutorials).where(eq(tutorials.id, id));
    return tutorial;
  }

  async getUserTutorialProgress(userId: string): Promise<(TutorialProgress & { tutorial: Tutorial })[]> {
    return await db
      .select({
        id: tutorialProgress.id,
        userId: tutorialProgress.userId,
        tutorialId: tutorialProgress.tutorialId,
        completed: tutorialProgress.completed,
        progressPercent: tutorialProgress.progressPercent,
        completedAt: tutorialProgress.completedAt,
        createdAt: tutorialProgress.createdAt,
        updatedAt: tutorialProgress.updatedAt,
        tutorial: tutorials,
      })
      .from(tutorialProgress)
      .innerJoin(tutorials, eq(tutorialProgress.tutorialId, tutorials.id))
      .where(eq(tutorialProgress.userId, userId))
      .orderBy(desc(tutorialProgress.updatedAt));
  }

  async upsertTutorialProgress(progressData: InsertTutorialProgress): Promise<TutorialProgress> {
    const [progress] = await db
      .insert(tutorialProgress)
      .values(progressData)
      .onConflictDoUpdate({
        target: [tutorialProgress.userId, tutorialProgress.tutorialId],
        set: {
          ...progressData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return progress;
  }

  // AI Chat operations
  async createChatMessage(message: InsertAiChatMessage): Promise<AiChatMessage> {
    const [newMessage] = await db.insert(aiChatMessages).values(message).returning();
    return newMessage;
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
