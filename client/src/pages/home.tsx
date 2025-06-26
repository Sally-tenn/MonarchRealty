import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import AIChatbot from "@/components/ai/chatbot";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import AnalyticsWidget from "@/components/dashboard/analytics-widget";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Users, 
  BarChart3, 
  PlayCircle,
  ArrowRight,
  BookOpen
} from "lucide-react";

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  const { data: dashboardStats, error: statsError } = useQuery({
    queryKey: ['/api/dashboard/stats'],
    retry: false,
  });

  const { data: recentProperties } = useQuery({
    queryKey: ['/api/properties', { limit: 3, agentId: user?.id }],
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const getDashboardPath = (role: string) => {
    switch (role) {
      case 'admin': return '/dashboard/admin';
      case 'manager': return '/dashboard/manager';
      case 'investor': return '/dashboard/investor';
      default: return '/dashboard/agent';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-slate-dark mb-4 font-['Poppins']">
              Welcome back, {user?.firstName || user?.email?.split('@')[0] || 'User'}!
            </h1>
            <p className="text-xl text-slate-600">
              Here's an overview of your real estate portfolio and recent activity.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <AnalyticsWidget
              title="Total Properties"
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
                label: "this month"
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
              title="Avg Response Time"
              value={`${(dashboardStats?.avgResponseTime || 0).toFixed(1)} days`}
              icon={<Users />}
              color="orange"
              change={{
                value: -15,
                label: "improvement"
              }}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <GlassCard className="text-center">
              <BarChart3 className="w-12 h-12 text-primary-Blue mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                View Dashboard
              </h3>
              <p className="text-slate-600 mb-6">
                Access your personalized dashboard with analytics and insights tailored to your role.
              </p>
              <Link href={getDashboardPath(user?.role || 'agent')}>
                <Button className="w-full bg-primary-blue hover:bg-blue-700 text-white font-medium">
                  Open Dashboard
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </GlassCard>

            <GlassCard className="text-center">
              <Building2 className="w-12 h-12 text-secondary-purple mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                Browse Properties
              </h3>
              <p className="text-slate-600 mb-6">
                Explore available properties with advanced search and filtering capabilities.
              </p>
              <Link href="/properties">
                <Button className="w-full bg-secondary-purple hover:bg-purple-700 text-white font-medium">
                  View Properties
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </GlassCard>

            <GlassCard className="text-center">
              <BookOpen className="w-12 h-12 text-success-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                Learning Center
              </h3>
              <p className="text-slate-600 mb-6">
                Access video tutorials and educational content to enhance your real estate knowledge.
              </p>
              <Link href="/tutorials">
                <Button className="w-full bg-success-green hover:bg-green-700 text-white font-medium">
                  Start Learning
                  <PlayCircle className="ml-2" size={16} />
                </Button>
              </Link>
            </GlassCard>
          </div>

          {/* Recent Properties */}
          {recentProperties && recentProperties.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-dark font-['Poppins']">
                  Your Recent Properties
                </h2>
                <Link href="/properties">
                  <Button variant="outline">
                    View All Properties
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </Link>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {recentProperties.slice(0, 3).map((property: any) => (
                  <GlassCard key={property.id} className="p-0">
                    <img
                      src={property.imageUrls?.[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-t-2xl"
                    />
                    <div className="p-4">
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
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Getting Started */}
          <GlassCard className="text-center">
            <h2 className="text-2xl font-bold text-slate-dark mb-4 font-['Poppins']">
              Ready to Get Started?
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Explore all the features Monarch Property has to offer. From property management 
              to AI-powered insights, we've got everything you need to succeed in real estate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutorials">
                <Button className="bg-primary-blue hover:bg-blue-700 text-white font-medium">
                  <PlayCircle className="mr-2" size={16} />
                  Watch Tutorials
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline">
                  View Pricing Plans
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </main>

      <AIChatbot />
      <Footer />
    </div>
  );
}
