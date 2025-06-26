import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import AIChatbot from "@/components/ai/chatbot";
import AnalyticsWidget from "@/components/dashboard/analytics-widget";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Building2, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  AlertCircle,
  Plus,
  Eye
} from "lucide-react";

export default function AgentDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const { 
    data: dashboardStats, 
    isLoading: statsLoading, 
    error: statsError 
  } = useQuery({
    queryKey: ['/api/dashboard/stats'],
    retry: false,
  });

  const { 
    data: recentProperties, 
    isLoading: propertiesLoading 
  } = useQuery({
    queryKey: ['/api/properties', { limit: 5, agentId: user?.id }],
    retry: false,
  });

  const { 
    data: analytics 
  } = useQuery({
    queryKey: ['/api/analytics', { metricName: 'monthly_revenue' }],
    retry: false,
  });

  useEffect(() => {
    if (statsError && isUnauthorizedError(statsError as Error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [statsError, toast]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-dark mb-4 font-['Poppins']">
                Agent Dashboard
              </h1>
              <p className="text-xl text-slate-600">
                Welcome back, {user?.firstName || 'Agent'}! Here's your performance overview.
              </p>
            </div>
            
            <Button className="bg-primary-blue hover:bg-blue-700 text-white font-medium">
              <Plus className="mr-2" size={16} />
              Add Property
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statsLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <GlassCard key={index}>
                  <Skeleton className="h-20 w-full" />
                </GlassCard>
              ))
            ) : (
              <>
                <AnalyticsWidget
                  title="Active Listings"
                  value={dashboardStats?.totalProperties || 0}
                  icon={<Building2 />}
                  color="blue"
                  change={{
                    value: 12,
                    label: "this month"
                  }}
                />
                <AnalyticsWidget
                  title="Monthly Revenue"
                  value={`$${(dashboardStats?.totalRevenue || 0).toLocaleString()}`}
                  icon={<DollarSign />}
                  color="green"
                  change={{
                    value: 8,
                    label: "vs last month"
                  }}
                />
                <AnalyticsWidget
                  title="Occupancy Rate"
                  value={`${(dashboardStats?.occupancyRate || 0).toFixed(1)}%`}
                  icon={<TrendingUp />}
                  color="purple"
                  change={{
                    value: 3,
                    label: "this quarter"
                  }}
                />
                <AnalyticsWidget
                  title="Response Time"
                  value={`${(dashboardStats?.avgResponseTime || 0).toFixed(1)} days`}
                  icon={<Users />}
                  color="orange"
                  change={{
                    value: -15,
                    label: "improvement"
                  }}
                />
              </>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Analytics Dashboard */}
            <GlassCard className="dashboard-widget">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Property management analytics dashboard"
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success-green font-['Poppins']">94.5%</div>
                  <div className="text-sm text-slate-600">Occupancy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-blue font-['Poppins']">$49K</div>
                  <div className="text-sm text-slate-600">Monthly Revenue</div>
                </div>
              </div>
            </GlassCard>

            {/* Management Tools */}
            <div className="space-y-6">
              <GlassCard className="dashboard-widget">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-dark font-['Poppins']">
                    Advanced Analytics
                  </h3>
                  <TrendingUp className="text-primary-blue" size={20} />
                </div>
                <p className="text-slate-600 mb-4">
                  Real-time insights into property performance, market trends, and investment opportunities
                </p>
                <div className="flex items-center text-success-green">
                  <TrendingUp className="mr-2" size={16} />
                  <span className="font-medium">15% increase this quarter</span>
                </div>
              </GlassCard>

              <GlassCard className="dashboard-widget">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-dark font-['Poppins']">
                    Tenant Management
                  </h3>
                  <Users className="text-secondary-purple" size={20} />
                </div>
                <p className="text-slate-600 mb-4">
                  Streamlined tenant communication, lease tracking, and maintenance request management
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-dark">127</div>
                    <div className="text-sm text-slate-600">Active Tenants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-dark">8</div>
                    <div className="text-sm text-slate-600">Pending Requests</div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="dashboard-widget">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-dark font-['Poppins']">
                    Financial Management
                  </h3>
                  <DollarSign className="text-success-green" size={20} />
                </div>
                <p className="text-slate-600 mb-4">
                  Comprehensive financial tracking with automated rent collection and expense reporting
                </p>
                <div className="flex items-center text-primary-blue">
                  <DollarSign className="mr-2" size={16} />
                  <span className="font-medium">99.2% collection rate</span>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Recent Properties */}
          <GlassCard className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-dark font-['Poppins']">
                Recent Properties
              </h2>
              <Button variant="outline">
                <Eye className="mr-2" size={16} />
                View All
              </Button>
            </div>
            
            {propertiesLoading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : !recentProperties || recentProperties.length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="mx-auto text-slate-400 mb-4" size={48} />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No Properties Found</h3>
                <p className="text-slate-500">Start by adding your first property listing.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {recentProperties.slice(0, 3).map((property: any) => (
                  <div key={property.id} className="glass-card rounded-xl p-4">
                    <img
                      src={property.imageUrls?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <h3 className="font-semibold text-slate-dark mb-2">
                      {property.title}
                    </h3>
                    <p className="text-primary-blue font-bold mb-2">
                      ${parseFloat(property.price).toLocaleString()}
                    </p>
                    <p className="text-slate-500 text-sm">
                      {property.city}, {property.state}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard className="text-center">
            <h2 className="text-2xl font-bold text-slate-dark mb-4 font-['Poppins']">
              Quick Actions
            </h2>
            <p className="text-slate-600 mb-6">
              Access frequently used features and tools for efficient property management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary-blue hover:bg-blue-700 text-white font-medium">
                <Plus className="mr-2" size={16} />
                Add New Property
              </Button>
              <Button variant="outline">
                <Calendar className="mr-2" size={16} />
                Schedule Viewing
              </Button>
              <Button variant="outline">
                <Users className="mr-2" size={16} />
                Manage Tenants
              </Button>
            </div>
          </GlassCard>
        </div>
      </main>

      <AIChatbot />
      <Footer />
    </div>
  );
}
