export interface PropertyFilters {
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
}

export interface DashboardStats {
  totalProperties: number;
  totalRevenue: number;
  occupancyRate: number;
  avgResponseTime: number;
}

export interface TutorialFilters {
  difficulty?: string;
  category?: string;
  limit?: number;
  offset?: number;
}

export interface ChatMessage {
  message: string;
  response: string;
  timestamp: Date;
}

export interface UserRole {
  role: 'user' | 'agent' | 'manager' | 'admin' | 'vendor' | 'investor';
}

export interface SubscriptionPlan {
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}
