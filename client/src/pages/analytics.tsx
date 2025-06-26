
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { AnalyticsWidget } from "@/components/dashboard/analytics-widget";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, PieChart, LineChart } from "lucide-react";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-dark mb-6 font-['Poppins']">
            Analytics Dashboard
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive analytics and insights for your real estate portfolio and market performance.
          </p>
        </div>

        {/* Analytics Widgets */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          <AnalyticsWidget 
            title="Revenue Trends" 
            value="$125,430"
            change={12.5}
            icon={<TrendingUp size={24} />}
          />
          <AnalyticsWidget 
            title="Occupancy Rate" 
            value="94.2%"
            change={2.1}
            icon={<BarChart3 size={24} />}
          />
          <AnalyticsWidget 
            title="Property Value" 
            value="$2.4M"
            change={8.3}
            icon={<PieChart size={24} />}
          />
        </div>

        {/* Detailed Analytics */}
        <div className="grid lg:grid-cols-2 gap-8">
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <LineChart className="text-primary-blue" size={32} />
              <h2 className="text-2xl font-bold text-slate-dark">Market Analysis</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Comprehensive market trends and property value analysis for informed investment decisions.
            </p>
            <Button className="bg-primary-blue hover:bg-blue-700 text-white">
              View Detailed Report
            </Button>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-primary-blue" size={32} />
              <h2 className="text-2xl font-bold text-slate-dark">Performance Metrics</h2>
            </div>
            <p className="text-slate-600 mb-6">
              Track key performance indicators and optimize your real estate portfolio management.
            </p>
            <Button className="bg-primary-blue hover:bg-blue-700 text-white">
              Export Analytics
            </Button>
          </GlassCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
