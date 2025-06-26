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
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Building2, 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Calculator,
  Target,
  Briefcase,
  MapPin,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Plus
} from "lucide-react";

export default function InvestorDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [selectedTimeframe, setSelectedTimeframe] = useState('12m');

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

  const mockPortfolioData = {
    totalInvestment: 2840000,
    currentValue: 3420000,
    totalROI: 20.42,
    monthlyIncome: 24500,
    properties: 8,
    avgCapRate: 7.8,
    totalEquity: 1850000,
    leverageRatio: 65.2
  };

  const mockProperties = [
    { 
      id: 1, 
      name: "Sunset Apartments", 
      location: "Austin, TX", 
      investment: 450000, 
      currentValue: 520000, 
      monthlyIncome: 3200, 
      roi: 15.6,
      type: "Multi-Family",
      status: "performing"
    },
    { 
      id: 2, 
      name: "Downtown Office Complex", 
      location: "Denver, CO", 
      investment: 1200000, 
      currentValue: 1450000, 
      monthlyIncome: 8500, 
      roi: 20.8,
      type: "Commercial",
      status: "performing"
    },
    { 
      id: 3, 
      name: "Riverside Condos", 
      location: "Portland, OR", 
      investment: 680000, 
      currentValue: 750000, 
      monthlyIncome: 4200, 
      roi: 10.3,
      type: "Residential",
      status: "underperforming"
    },
  ];

  const mockMarketInsights = [
    { market: "Austin, TX", appreciation: 8.5, trend: "up", confidence: "high" },
    { market: "Denver, CO", appreciation: 6.2, trend: "up", confidence: "medium" },
    { market: "Portland, OR", appreciation: 3.1, trend: "down", confidence: "low" },
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
                Investment Dashboard
              </h1>
              <p className="text-xl text-slate-600">
                Track your real estate portfolio performance and discover new opportunities.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 glass-card px-4 py-2 rounded-lg">
                {['6m', '12m', '24m', 'all'].map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant="ghost"
                    size="sm"
                    className={`${
                      selectedTimeframe === timeframe
                        ? "bg-primary-blue text-white"
                        : "text-slate-600"
                    }`}
                    onClick={() => setSelectedTimeframe(timeframe)}
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
              <Button className="bg-primary-blue hover:bg-blue-700 text-white font-medium">
                <Plus className="mr-2" size={16} />
                New Investment
              </Button>
            </div>
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <AnalyticsWidget
              title="Total Investment"
              value={`$${(mockPortfolioData.totalInvestment / 1000000).toFixed(1)}M`}
              icon={<Briefcase />}
              color="blue"
              change={{
                value: 12,
                label: "this year"
              }}
            />
            <AnalyticsWidget
              title="Portfolio Value"
              value={`$${(mockPortfolioData.currentValue / 1000000).toFixed(1)}M`}
              icon={<TrendingUp />}
              color="green"
              change={{
                value: 18,
                label: "appreciation"
              }}
            />
            <AnalyticsWidget
              title="Total ROI"
              value={`${mockPortfolioData.totalROI}%`}
              icon={<Target />}
              color="purple"
              change={{
                value: 5.2,
                label: "vs benchmark"
              }}
            />
            <AnalyticsWidget
              title="Monthly Income"
              value={`$${mockPortfolioData.monthlyIncome.toLocaleString()}`}
              icon={<DollarSign />}
              color="orange"
              change={{
                value: 8,
                label: "this month"
              }}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Portfolio Performance Chart */}
            <div className="lg:col-span-2">
              <GlassCard className="dashboard-widget">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-dark font-['Poppins']">
                    Portfolio Performance
                  </h3>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2" size={16} />
                    Detailed Report
                  </Button>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Investment portfolio performance analytics"
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success-green font-['Poppins']">
                      ${(mockPortfolioData.totalEquity / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-slate-600">Total Equity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-blue font-['Poppins']">
                      {mockPortfolioData.avgCapRate}%
                    </div>
                    <div className="text-sm text-slate-600">Avg Cap Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500 font-['Poppins']">
                      {mockPortfolioData.leverageRatio}%
                    </div>
                    <div className="text-sm text-slate-600">Leverage</div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Key Metrics */}
            <div className="space-y-6">
              <GlassCard className="dashboard-widget">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-dark font-['Poppins']">
                    Investment Metrics
                  </h3>
                  <Calculator className="text-primary-blue" size={20} />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Cash-on-Cash Return</span>
                    <span className="font-semibold text-success-green">12.4%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">IRR (Internal Rate of Return)</span>
                    <span className="font-semibold text-slate-dark">15.8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">DSCR (Debt Service Coverage)</span>
                    <span className="font-semibold text-slate-dark">1.35</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Loan-to-Value Ratio</span>
                    <span className="font-semibold text-slate-dark">65.2%</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="dashboard-widget">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-dark font-['Poppins']">
                    Portfolio Allocation
                  </h3>
                  <PieChart className="text-secondary-purple" size={20} />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-600">Residential</span>
                    </div>
                    <span className="font-semibold text-slate-dark">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-slate-600">Commercial</span>
                    </div>
                    <span className="font-semibold text-slate-dark">35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-slate-600">Multi-Family</span>
                    </div>
                    <span className="font-semibold text-slate-dark">20%</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Property Portfolio */}
          <GlassCard className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-dark font-['Poppins']">
                Property Portfolio
              </h2>
              <Button variant="outline">
                <Eye className="mr-2" size={16} />
                View All Properties
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-glass-border">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Property</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Investment</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Current Value</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Monthly Income</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">ROI</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProperties.map((property) => (
                    <tr key={property.id} className="border-b border-glass-border hover:bg-white/30">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-slate-dark">{property.name}</p>
                          <div className="flex items-center text-sm text-slate-500">
                            <MapPin className="mr-1" size={12} />
                            {property.location} • {property.type}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-dark">
                        ${property.investment.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-dark">${property.currentValue.toLocaleString()}</span>
                          {property.currentValue > property.investment ? (
                            <ArrowUpRight className="text-green-500" size={16} />
                          ) : (
                            <ArrowDownRight className="text-red-500" size={16} />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-dark">
                        ${property.monthlyIncome.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${
                          property.roi > 15 ? 'text-green-500' : 
                          property.roi > 10 ? 'text-orange-500' : 'text-red-500'
                        }`}>
                          {property.roi}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={
                          property.status === 'performing' ? 'bg-green-500' : 'bg-orange-500'
                        }>
                          {property.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>

          {/* Market Insights */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <GlassCard className="dashboard-widget">
              <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                Market Insights
              </h3>
              <div className="space-y-4">
                {mockMarketInsights.map((market, index) => (
                  <div key={index} className="glass-input p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-dark">{market.market}</h4>
                      <div className="flex items-center space-x-2">
                        {market.trend === 'up' ? (
                          <ArrowUpRight className="text-green-500" size={16} />
                        ) : (
                          <ArrowDownRight className="text-red-500" size={16} />
                        )}
                        <span className={`font-semibold ${
                          market.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {market.appreciation}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-sm">Market Confidence</span>
                      <Badge className={
                        market.confidence === 'high' ? 'bg-green-500' :
                        market.confidence === 'medium' ? 'bg-orange-500' : 'bg-red-500'
                      }>
                        {market.confidence}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="dashboard-widget">
              <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                Investment Opportunities
              </h3>
              <div className="space-y-4">
                <div className="glass-input p-4 rounded-lg">
                  <h4 className="font-medium text-slate-dark mb-2">Emerging Markets</h4>
                  <p className="text-slate-600 text-sm mb-3">
                    High-growth potential areas with favorable market conditions.
                  </p>
                  <Button variant="outline" size="sm">Explore Markets</Button>
                </div>
                <div className="glass-input p-4 rounded-lg">
                  <h4 className="font-medium text-slate-dark mb-2">REITs & Funds</h4>
                  <p className="text-slate-600 text-sm mb-3">
                    Diversify your portfolio with real estate investment trusts.
                  </p>
                  <Button variant="outline" size="sm">View REITs</Button>
                </div>
                <div className="glass-input p-4 rounded-lg">
                  <h4 className="font-medium text-slate-dark mb-2">Distressed Properties</h4>
                  <p className="text-slate-600 text-sm mb-3">
                    Below-market value properties with high return potential.
                  </p>
                  <Button variant="outline" size="sm">Browse Deals</Button>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Investment Tools */}
          <GlassCard className="text-center">
            <h2 className="text-2xl font-bold text-slate-dark mb-4 font-['Poppins']">
              Investment Analysis Tools
            </h2>
            <p className="text-slate-600 mb-6">
              Advanced calculators and analysis tools to help you make informed investment decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary-blue hover:bg-blue-700 text-white font-medium">
                <Calculator className="mr-2" size={16} />
                ROI Calculator
              </Button>
              <Button variant="outline">
                <TrendingUp className="mr-2" size={16} />
                Market Analysis
              </Button>
              <Button variant="outline">
                <Target className="mr-2" size={16} />
                Deal Analyzer
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
