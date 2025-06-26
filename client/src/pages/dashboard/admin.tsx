import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import AIChatbot from "@/components/ai/chatbot";
import AnalyticsWidget from "@/components/dashboard/analytics-widget";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Building2, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Settings,
  Shield,
  Database,
  Activity,
  Search,
  UserPlus,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit,
  Trash2
} from "lucide-react";

export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [selectedView, setSelectedView] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const { 
    data: dashboardStats, 
    isLoading: statsLoading, 
    error: statsError 
  } = useQuery({
    queryKey: ['/api/dashboard/stats'],
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

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <GlassCard className="text-center py-12">
          <Shield className="mx-auto text-red-500 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-slate-dark mb-4">Access Denied</h3>
          <p className="text-slate-600">You don't have permission to access this admin dashboard.</p>
        </GlassCard>
      </div>
    );
  }

  const mockSystemStats = {
    totalUsers: 1247,
    activeProperties: 3891,
    totalRevenue: 2840000,
    systemUptime: 99.98,
    apiCalls: 156780,
    storageUsed: 67.2
  };

  const mockUsers = [
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com", role: "agent", status: "active", lastLogin: "2 hours ago" },
    { id: 2, name: "Mike Chen", email: "mike@example.com", role: "manager", status: "active", lastLogin: "1 day ago" },
    { id: 3, name: "Emily Rodriguez", email: "emily@example.com", role: "agent", status: "inactive", lastLogin: "1 week ago" },
    { id: 4, name: "David Kim", email: "david@example.com", role: "investor", status: "active", lastLogin: "3 hours ago" },
  ];

  const mockSystemLogs = [
    { id: 1, type: "info", message: "User login successful", user: "sarah@example.com", timestamp: "10:30 AM" },
    { id: 2, type: "warning", message: "High API usage detected", user: "system", timestamp: "10:15 AM" },
    { id: 3, type: "error", message: "Database connection timeout", user: "system", timestamp: "9:45 AM" },
    { id: 4, type: "info", message: "Property created", user: "mike@example.com", timestamp: "9:30 AM" },
  ];

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-dark mb-4 font-['Poppins']">
                Admin Dashboard
              </h1>
              <p className="text-xl text-slate-600">
                System administration, user management, and platform oversight.
              </p>
            </div>
            
            <Button className="bg-red-600 hover:bg-red-700 text-white font-medium">
              <Shield className="mr-2" size={16} />
              Admin Settings
            </Button>
          </div>

          {/* View Selector */}
          <div className="flex justify-center mb-8">
            <GlassCard className="p-2 inline-flex space-x-1">
              {['overview', 'users', 'system', 'security'].map((view) => (
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

          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <AnalyticsWidget
              title="Total Users"
              value={mockSystemStats.totalUsers}
              icon={<Users />}
              color="blue"
              change={{
                value: 15,
                label: "new this month"
              }}
            />
            <AnalyticsWidget
              title="Active Properties"
              value={mockSystemStats.activeProperties}
              icon={<Building2 />}
              color="green"
              change={{
                value: 23,
                label: "this month"
              }}
            />
            <AnalyticsWidget
              title="Platform Revenue"
              value={`$${(mockSystemStats.totalRevenue / 1000000).toFixed(1)}M`}
              icon={<DollarSign />}
              color="purple"
              change={{
                value: 18,
                label: "growth"
              }}
            />
            <AnalyticsWidget
              title="System Uptime"
              value={`${mockSystemStats.systemUptime}%`}
              icon={<Activity />}
              color="orange"
              change={{
                value: 0.02,
                label: "this month"
              }}
            />
          </div>

          {selectedView === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* System Health */}
              <GlassCard className="dashboard-widget">
                <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                  System Health
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 glass-input rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-slate-dark">API Services</span>
                    </div>
                    <span className="text-green-500 font-medium">Operational</span>
                  </div>
                  <div className="flex items-center justify-between p-3 glass-input rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-slate-dark">Database</span>
                    </div>
                    <span className="text-green-500 font-medium">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between p-3 glass-input rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-slate-dark">Storage</span>
                    </div>
                    <span className="text-yellow-600 font-medium">{mockSystemStats.storageUsed}% Used</span>
                  </div>
                </div>
              </GlassCard>

              {/* Recent Activity */}
              <GlassCard className="dashboard-widget">
                <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                  System Logs
                </h3>
                <div className="space-y-3">
                  {mockSystemLogs.map((log) => (
                    <div key={log.id} className="flex items-center space-x-3 p-3 glass-input rounded-lg">
                      {log.type === 'error' && <AlertTriangle className="text-red-500" size={16} />}
                      {log.type === 'warning' && <AlertTriangle className="text-orange-500" size={16} />}
                      {log.type === 'info' && <CheckCircle className="text-blue-500" size={16} />}
                      <div className="flex-1">
                        <p className="text-slate-dark text-sm">{log.message}</p>
                        <p className="text-slate-500 text-xs">{log.user} • {log.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {selectedView === 'users' && (
            <div className="space-y-6">
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-dark font-['Poppins']">
                    User Management
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 glass-input"
                      />
                    </div>
                    <Button className="bg-primary-blue hover:bg-blue-700 text-white">
                      <UserPlus className="mr-2" size={16} />
                      Add User
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-glass-border">
                        <th className="text-left py-3 px-4 font-medium text-slate-600">User</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Last Login</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-glass-border hover:bg-white/30">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-slate-dark">{user.name}</p>
                              <p className="text-sm text-slate-500">{user.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={
                              user.role === 'admin' ? 'bg-red-500' :
                              user.role === 'manager' ? 'bg-purple-500' :
                              user.role === 'agent' ? 'bg-blue-500' : 'bg-green-500'
                            }>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={user.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-slate-dark">{user.lastLogin}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="mr-1" size={14} />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="mr-1" size={14} />
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>
          )}

          {selectedView === 'system' && (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <GlassCard className="dashboard-widget">
                <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                  System Resources
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">API Calls Today</span>
                    <span className="font-semibold text-slate-dark">{mockSystemStats.apiCalls.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Storage Usage</span>
                    <span className="font-semibold text-slate-dark">{mockSystemStats.storageUsed}% (450GB/668GB)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Active Connections</span>
                    <span className="font-semibold text-slate-dark">247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Cache Hit Rate</span>
                    <span className="font-semibold text-success-green">94.2%</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="dashboard-widget">
                <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                  Database Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Connection Pool</span>
                    <span className="font-semibold text-success-green">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Query Performance</span>
                    <span className="font-semibold text-slate-dark">12ms avg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Backup Status</span>
                    <span className="font-semibold text-success-green">Up to date</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Replication Lag</span>
                    <span className="font-semibold text-slate-dark">0.2s</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {selectedView === 'security' && (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <GlassCard className="dashboard-widget">
                <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                  Security Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 glass-input rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="text-green-500" size={20} />
                      <span className="text-slate-dark">SSL Certificate</span>
                    </div>
                    <span className="text-green-500 font-medium">Valid</span>
                  </div>
                  <div className="flex items-center justify-between p-3 glass-input rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Database className="text-green-500" size={20} />
                      <span className="text-slate-dark">Data Encryption</span>
                    </div>
                    <span className="text-green-500 font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 glass-input rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="text-orange-500" size={20} />
                      <span className="text-slate-dark">Failed Login Attempts</span>
                    </div>
                    <span className="text-orange-500 font-medium">23 (24h)</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="dashboard-widget">
                <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                  Security Actions
                </h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Shield className="mr-2" size={16} />
                    View Security Logs
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2" size={16} />
                    Manage User Permissions
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Database className="mr-2" size={16} />
                    Backup Database
                  </Button>
                  <Button className="w-full justify-start bg-red-600 hover:bg-red-700 text-white">
                    <AlertTriangle className="mr-2" size={16} />
                    Emergency Lockdown
                  </Button>
                </div>
              </GlassCard>
            </div>
          )}

          {/* Quick Admin Actions */}
          <GlassCard className="text-center">
            <h2 className="text-2xl font-bold text-slate-dark mb-4 font-['Poppins']">
              Quick Admin Actions
            </h2>
            <p className="text-slate-600 mb-6">
              Administrative tools and system management functions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary-blue hover:bg-blue-700 text-white font-medium">
                <FileText className="mr-2" size={16} />
                Generate System Report
              </Button>
              <Button variant="outline">
                <Settings className="mr-2" size={16} />
                System Configuration
              </Button>
              <Button variant="outline">
                <Users className="mr-2" size={16} />
                Bulk User Operations
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
