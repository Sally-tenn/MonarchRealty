
import { Navigation } from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Code, BookOpen, Zap, Shield } from "lucide-react";

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-dark mb-6 font-['Poppins']">
            API Documentation
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive API documentation for developers to integrate with our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <GlassCard>
            <Code className="text-primary-blue mb-4" size={48} />
            <h3 className="text-2xl font-bold text-slate-dark mb-4">REST API</h3>
            <p className="text-slate-600 mb-6">
              Complete REST API documentation with endpoints, parameters, and examples.
            </p>
            <Button className="bg-primary-blue hover:bg-blue-700 text-white">
              View REST API
            </Button>
          </GlassCard>

          <GlassCard>
            <Zap className="text-primary-blue mb-4" size={48} />
            <h3 className="text-2xl font-bold text-slate-dark mb-4">GraphQL</h3>
            <p className="text-slate-600 mb-6">
              Flexible GraphQL API for efficient data fetching and manipulation.
            </p>
            <Button className="bg-primary-blue hover:bg-blue-700 text-white">
              View GraphQL
            </Button>
          </GlassCard>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard>
            <BookOpen className="text-primary-blue mb-4" size={48} />
            <h3 className="text-2xl font-bold text-slate-dark mb-4">Getting Started</h3>
            <p className="text-slate-600 mb-6">
              Quick start guide to begin using our API in your applications.
            </p>
            <Button variant="outline">Quick Start</Button>
          </GlassCard>

          <GlassCard>
            <Shield className="text-primary-blue mb-4" size={48} />
            <h3 className="text-2xl font-bold text-slate-dark mb-4">Authentication</h3>
            <p className="text-slate-600 mb-6">
              Learn about API authentication methods and security best practices.
            </p>
            <Button variant="outline">Auth Guide</Button>
          </GlassCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
