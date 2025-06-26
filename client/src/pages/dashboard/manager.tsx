import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import AIChatbot from "@/components/ai/chatbot";
import AnalyticsWidget from "@/components/dashboard/analytics-widget";
import RoleSelector from "@/components/dashboard/role-selector";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Building2, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Settings,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";

export default function ManagerDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [selectedView, setSelectedView] = useState('overview');

  const { 
    data: dashboardStats, 
    isLoading: statsLoading, 
    error: statsError 
  } = useQuery({
    queryKey: ['/api/dashboard/stats'],
    retry: false,
  });

  const { 
    data: analytics 
  } = useQuery({
    queryKey: ['/api/analytics'],
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

  const mockTeamData = [
    { name: "Sarah Johnson", role: "Agent", properties: 12, revenue: 45000, status: "active" },
    { name: "Mike Chen", role: "Agent", properties: 8, revenue: 32000, status: "active" },
    { name: "Emily Rodriguez", role: "Agent", properties: 15, revenue: 58000, status: "active" },
    { name: "David Kim", role: "Agent", properties: 6, revenue: 28000, status: "inactive" },
  ];

  const mockMaintenanceRequests = [
    { id: 1, property: "Sunset Apartments #204", issue: "Plumbing leak", priority: "high", status: "pending" },
    { id: 2, property: "Oak Street Condo", issue: "AC not working", priority: "medium", status: "in_progress" },
    { id: 3, property: "Downtown Loft B12", issue: "Light fixture", priority: "low", status: "completed" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-dark mb-4 font-['Poppins']">
                Manager Dashboard
              </h1>
              <p className="text-xl text-slate-600">
                Comprehensive management tools for property oversight and team coordination.
              </p>
            </div>
            
            <Button className="bg-primary-blue hover:bg-blue-700 text-white font-medium">
              <Settings className="mr-2" size={16} />
              Management Settings
            </Button>
          </div>

          {/* View Selector */}
          <div className="flex justify-center mb-8">
            <GlassCard className="p-2 inline-flex space-x-1">
              {['overview', 'team', 'maintenance', 'reports'].map((view) => (
                <Button
                  key={view}
                  variant="ghost"
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    selectedView === view
                      ? "bg-primary-blue text-white shadow-sm"
                      : "text-slate-600 hover:bg-white/50"
                  }`}
                  onClick={() => setSelectedView(view)}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </Button>
              ))}
            </GlassCard>
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
                  title="Total Properties"
                  value={dashboardStats?.totalProperties || 0}
                  icon={<Building2 />}
                  color="blue"
                  change={{
                    value: 18,
                    label: "this month"
                  }}
                />
                <AnalyticsWidget
                  title="Portfolio Revenue"
                  value={`$${((dashboardStats?.totalRevenue || 0) * 4).toLocaleString()}`}
                  icon={<DollarSign />}
                  color="green"
                  change={{
                    value: 12,
                    label: "vs last month"
                  }}
                />
                <AnalyticsWidget
                  title="Avg Occupancy"
                  value={`${(dashboardStats?.occupancyRate || 0).toFixed(1)}%`}
                  icon={<TrendingUp />}
                  color="purple"
                  change={{
                    value: 5,
                    label: "improvement"
                  }}
                />
                <AnalyticsWidget
                  title="Active Agents"
                  value="12"
                  icon={<Users />}
                  color="orange"
                  change={{
                    value: 8,
                    label: "new hires"
                  }}
                />
              </>
            )}
          </div>

          {selectedView === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Portfolio Overview */}
              <GlassCard className="dashboard-widget">
                <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                  Portfolio Performance
                </h3>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Portfolio performance analytics"
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success-green font-['Poppins']">98.1%</div>
                    <div className="text-sm text-slate-600">Occupancy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-blue font-['Poppins']">$127K</div>
                    <div className="text-sm text-slate-600">Monthly Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500 font-['Poppins']">156</div>
                    <div className="text-sm text-slate-600">Properties</div>
                  </div>
                </div>
              </GlassCard>

              {/* Recent Activity */}
              <GlassCard className="dashboard-widget">
                <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 glass-input rounded-lg">
                    <CheckCircle className="text-green-500" size={20} />
                    <div>
                      <p className="text-slate-dark font-medium">Property listing approved</p>
                      <p className="text-slate-500 text-sm">Sunset Apartments - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 glass-input rounded-lg">
                    <AlertTriangle className="text-orange-500" size={20} />
                    <div>
                      <p className="text-slate-dark font-medium">Maintenance request pending</p>
                      <p className="text-slate-500 text-sm">Oak Street Condo - 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 glass-input rounded-lg">
                    <Users className="text-blue-500" size={20} />
                    <div>
                      <p className="text-slate-dark font-medium">New agent onboarded</p>
                      <p className="text-slate-500 text-sm">Sarah Johnson - 1 day ago</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {selectedView === 'team' && (
            <GlassCard className="mb-12">
              <h3 className="text-xl font-semibold text-slate-dark mb-6 font-['Poppins']">
                Team Performance
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-glass-border">
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Agent</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Properties</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Revenue</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTeamData.map((agent, index) => (
                      <tr key={index} className="border-b border-glass-border hover:bg-white/30">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-slate-dark">{agent.name}</p>
                            <p className="text-sm text-slate-500">{agent.role}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-dark">{agent.properties}</td>
                        <td className="py-3 px-4 text-slate-dark">${agent.revenue.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <Badge className={agent.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                            {agent.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          )}

          {selectedView === 'maintenance' && (
            <GlassCard className="mb-12">
              <h3 className="text-xl font-semibold text-slate-dark mb-6 font-['Poppins']">
                Maintenance Requests
              </h3>
              <div className="space-y-4">
                {mockMaintenanceRequests.map((request) => (
                  <div key={request.id} className="glass-input p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-dark">{request.property}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={
                          request.priority === 'high' ? 'bg-red-500' :
                          request.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'
                        }>
                          {request.priority}
                        </Badge>
                        <Badge className={
                          request.status === 'completed' ? 'bg-green-500' :
                          request.status === 'in_progress' ? 'bg-blue-500' : 'bg-gray-500'
                        }>
                          {request.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-3">{request.issue}</p>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {selectedView === 'reports' && (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <GlassCard className="dashboard-widget">
                <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                  Financial Reports
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 glass-input rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="text-blue-500" size={20} />
                      <span className="text-slate-dark">Monthly Revenue Report</span>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 glass-input rounded-lg">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="text-green-500" size={20} />
                      <span className="text-slate-dark">Occupancy Analysis</span>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 glass-input rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="text-purple-500" size={20} />
                      <span className="text-slate-dark">Performance Metrics</span>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="dashboard-widget">
                <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-primary-blue hover:bg-blue-700 text-white">
                    <Users className="mr-2" size={16} />
                    Manage Team
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Building2 className="mr-2" size={16} />
                    Property Overview
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="mr-2" size={16} />
                    System Settings
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2" size={16} />
                    Generate Report
                  </Button>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </main>

      <AIChatbot />
      <Footer />
    </div>
  );
}
