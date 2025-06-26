import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { PlayCircle, CheckCircle } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 smooth-scroll">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/80 via-secondary-purple/60 to-slate-900/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8 font-['Poppins']">
                Modern Real Estate
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  {" "}Management
                </span>
                <br />Platform
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Streamline your property management with AI-powered insights, comprehensive 
                analytics, and seamless integration across all your real estate operations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <div className="flex items-center text-blue-100">
                  <CheckCircle className="text-green-400 mr-3" size={20} />
                  <span>MLS Integration Across All 50 States</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <CheckCircle className="text-green-400 mr-3" size={20} />
                  <span>AI-Powered Property Analytics</span>
                </div>
              </div>
              <div className="flex items-center text-blue-100 mb-8">
                <CheckCircle className="text-green-400 mr-3" size={20} />
                <span>Comprehensive Video Tutorial Library</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => window.location.href = '/api/login'}
                  className="bg-white text-primary-blue px-8 py-4 text-lg font-semibold hover:bg-blue-50 transition-colors shadow-xl font-['Poppins']"
                >
                  <PlayCircle className="mr-2" size={20} />
                  Start Free Trial
                </Button>
                <Button
                  variant="ghost"
                  className="glass-card px-8 py-4 text-white text-lg font-semibold hover:bg-white/20 transition-colors font-['Poppins']"
                >
                  <PlayCircle className="mr-2" size={20} />
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className="relative">
              <GlassCard className="shadow-2xl animate-float">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Property management analytics dashboard"
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
                <div className="grid grid-cols-3 gap-4 text-white">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 font-['Poppins']">2,847</div>
                    <div className="text-sm text-blue-200">Properties</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300 font-['Poppins']">$2.4M</div>
                    <div className="text-sm text-blue-200">Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-300 font-['Poppins']">98.2%</div>
                    <div className="text-sm text-blue-200">Occupancy</div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-dark mb-4 font-['Poppins']">
              Comprehensive Real Estate Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage, analyze, and grow your real estate portfolio in one powerful platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="text-center">
              <div className="w-16 h-16 bg-primary-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                Property Management
              </h3>
              <p className="text-slate-600 mb-6">
                Comprehensive tools for managing rental properties, tenant relationships, and maintenance workflows.
              </p>
              <ul className="text-left text-slate-600 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Tenant Portal
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Maintenance Tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Rent Collection
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="text-center">
              <div className="w-16 h-16 bg-secondary-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                MLS Integration
              </h3>
              <p className="text-slate-600 mb-6">
                Real-time property data integration across all 50 US states with advanced search capabilities.
              </p>
              <ul className="text-left text-slate-600 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Real-time Data
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Advanced Filters
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Market Analytics
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-dark mb-4 font-['Poppins']">
                AI Assistant
              </h3>
              <p className="text-slate-600 mb-6">
                Intelligent chatbot with video tutorials and enhanced real estate guidance.
              </p>
              <ul className="text-left text-slate-600 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  24/7 Support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Video Tutorials
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  Smart Insights
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}