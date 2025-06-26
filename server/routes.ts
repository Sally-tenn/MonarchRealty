import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertPropertySchema,
  insertAnalyticsSchema,
  insertTutorialProgressSchema,
  insertAiChatMessageSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Property routes
  app.get('/api/properties', async (req, res) => {
    try {
      const filters = {
        search: req.query.search as string,
        propertyType: req.query.propertyType as string,
        status: req.query.status as string,
        minPrice: req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined,
        maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined,
        bedrooms: req.query.bedrooms ? parseInt(req.query.bedrooms as string) : undefined,
        bathrooms: req.query.bathrooms ? parseFloat(req.query.bathrooms as string) : undefined,
        city: req.query.city as string,
        state: req.query.state as string,
        agentId: req.query.agentId as string,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 12,
        offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
      };
      
      const properties = await storage.getProperties(filters);
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get('/api/properties/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      console.error("Error fetching property:", error);
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  app.post('/api/properties', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const propertyData = insertPropertySchema.parse({
        ...req.body,
        agentId: userId,
      });
      
      const property = await storage.createProperty(propertyData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      console.error("Error creating property:", error);
      res.status(500).json({ message: "Failed to create property" });
    }
  });

  app.put('/api/properties/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      // Check if property exists and belongs to user (or user is admin)
      const existingProperty = await storage.getProperty(id);
      if (!existingProperty) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      const user = await storage.getUser(userId);
      if (existingProperty.agentId !== userId && user?.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized to update this property" });
      }
      
      const updates = insertPropertySchema.partial().parse(req.body);
      const updatedProperty = await storage.updateProperty(id, updates);
      
      res.json(updatedProperty);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      console.error("Error updating property:", error);
      res.status(500).json({ message: "Failed to update property" });
    }
  });

  app.delete('/api/properties/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      // Check if property exists and belongs to user (or user is admin)
      const existingProperty = await storage.getProperty(id);
      if (!existingProperty) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      const user = await storage.getUser(userId);
      if (existingProperty.agentId !== userId && user?.role !== 'admin') {
        return res.status(403).json({ message: "Unauthorized to delete this property" });
      }
      
      const deleted = await storage.deleteProperty(id);
      
      if (deleted) {
        res.json({ message: "Property deleted successfully" });
      } else {
        res.status(500).json({ message: "Failed to delete property" });
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ message: "Failed to delete property" });
    }
  });

  // Dashboard and Analytics routes
  app.get('/api/dashboard/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await storage.getUserDashboardStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  app.get('/api/analytics', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const filters = {
        metricName: req.query.metricName as string,
        propertyId: req.query.propertyId ? parseInt(req.query.propertyId as string) : undefined,
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
      };
      
      const analytics = await storage.getAnalyticsByUser(userId, filters);
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.post('/api/analytics', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const analyticsData = insertAnalyticsSchema.parse({
        ...req.body,
        userId,
      });
      
      const analytics = await storage.createAnalytics(analyticsData);
      res.status(201).json(analytics);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid analytics data", errors: error.errors });
      }
      console.error("Error creating analytics:", error);
      res.status(500).json({ message: "Failed to create analytics" });
    }
  });

  // Tutorial routes
  app.get('/api/tutorials', async (req, res) => {
    try {
      const filters = {
        difficulty: req.query.difficulty as string,
        category: req.query.category as string,
        limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
        offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
      };
      
      const tutorials = await storage.getTutorials(filters);
      res.json(tutorials);
    } catch (error) {
      console.error("Error fetching tutorials:", error);
      res.status(500).json({ message: "Failed to fetch tutorials" });
    }
  });

  app.get('/api/tutorials/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const tutorial = await storage.getTutorial(id);
      
      if (!tutorial) {
        return res.status(404).json({ message: "Tutorial not found" });
      }
      
      res.json(tutorial);
    } catch (error) {
      console.error("Error fetching tutorial:", error);
      res.status(500).json({ message: "Failed to fetch tutorial" });
    }
  });

  app.get('/api/tutorials/progress/me', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getUserTutorialProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching tutorial progress:", error);
      res.status(500).json({ message: "Failed to fetch tutorial progress" });
    }
  });

  app.post('/api/tutorials/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progressData = insertTutorialProgressSchema.parse({
        ...req.body,
        userId,
      });
      
      const progress = await storage.upsertTutorialProgress(progressData);
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      }
      console.error("Error updating tutorial progress:", error);
      res.status(500).json({ message: "Failed to update tutorial progress" });
    }
  });

  // AI Chat routes
  app.get('/api/ai/chat/history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      
      const history = await storage.getUserChatHistory(userId, limit);
      res.json(history);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  });

  app.post('/api/ai/chat', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { message, context } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ message: "Message is required" });
      }
      
      // TODO: Integrate with actual AI service (OpenAI, etc.)
      // For now, provide contextual responses based on real estate domain
      let response = "I'm here to help with your real estate questions!";
      
      const messageLower = message.toLowerCase();
      
      if (messageLower.includes('occupancy') || messageLower.includes('vacancy')) {
        response = "Occupancy rate is calculated as (occupied units / total units) × 100. A healthy occupancy rate for rental properties is typically 90-95%. Would you like me to show you tutorials on improving occupancy rates?";
      } else if (messageLower.includes('revenue') || messageLower.includes('income')) {
        response = "Property revenue includes rental income, fees, and other income sources. Key metrics to track are gross rental yield, net rental yield, and cash flow. I can help you understand these calculations better.";
      } else if (messageLower.includes('maintenance') || messageLower.includes('repair')) {
        response = "Effective maintenance management involves preventive scheduling, vendor relationships, and quick response times. The average response time for maintenance requests should be 24-48 hours for non-emergency items.";
      } else if (messageLower.includes('market') || messageLower.includes('analysis')) {
        response = "Market analysis involves studying comparable properties, rental rates, vacancy rates, and local economic factors. I can guide you through creating comprehensive market reports.";
      } else if (messageLower.includes('roi') || messageLower.includes('return')) {
        response = "ROI (Return on Investment) for real estate is calculated as (Annual Rental Income - Annual Expenses) / Total Investment × 100. A good ROI for rental properties is typically 8-12%.";
      }
      
      const chatMessageData = insertAiChatMessageSchema.parse({
        userId,
        message,
        response,
        context: context || {},
      });
      
      const chatMessage = await storage.createChatMessage(chatMessageData);
      res.json({ response: chatMessage.response });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid chat data", errors: error.errors });
      }
      console.error("Error processing chat message:", error);
      res.status(500).json({ message: "Failed to process chat message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
