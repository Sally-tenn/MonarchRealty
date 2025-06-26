
import { Navigation } from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Users, Target, Award, Building } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-dark mb-6 font-['Poppins']">
            About PropertyHub
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Revolutionizing real estate management with cutting-edge technology and comprehensive solutions for properties, investments, and market analytics.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <GlassCard>
            <Target className="text-primary-blue mb-4" size={48} />
            <h3 className="text-2xl font-bold text-slate-dark mb-4">Our Mission</h3>
            <p className="text-slate-600">
              To empower real estate professionals with intelligent tools that streamline property management, enhance investment decisions, and drive market success through data-driven insights.
            </p>
          </GlassCard>
          
          <GlassCard>
            <Award className="text-primary-blue mb-4" size={48} />
            <h3 className="text-2xl font-bold text-slate-dark mb-4">Our Vision</h3>
            <p className="text-slate-600">
              To become the leading platform that transforms how real estate professionals manage properties, analyze markets, and connect with opportunities worldwide.
            </p>
          </GlassCard>
        </div>

        {/* Team Section */}
        <GlassCard className="text-center">
          <Users className="text-primary-blue mx-auto mb-6" size={64} />
          <h2 className="text-3xl font-bold text-slate-dark mb-6">Our Team</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Our diverse team of real estate experts, developers, and data scientists work together to create innovative solutions that address the evolving needs of the property market.
          </p>
          <Button className="bg-primary-blue hover:bg-blue-700 text-white">
            <Building className="mr-2" size={16} />
            Join Our Team
          </Button>
        </GlassCard>
      </main>

      <Footer />
    </div>
  );
}
