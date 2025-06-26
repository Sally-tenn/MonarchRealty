
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, MessageCircle, Book, Video } from "lucide-react";

export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-dark mb-6 font-['Poppins']">
            Support Center
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get help when you need it. Browse our resources or contact our support team directly.
          </p>
        </div>

        {/* Search */}
        <GlassCard className="mb-12">
          <div className="flex gap-4">
            <Input placeholder="Search for help articles, tutorials, or FAQs..." className="flex-1" />
            <Button className="bg-primary-blue hover:bg-blue-700 text-white">
              Search
            </Button>
          </div>
        </GlassCard>

        {/* Support Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <GlassCard className="text-center">
            <HelpCircle className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">FAQs</h3>
            <p className="text-slate-600 mb-4">Find answers to commonly asked questions</p>
            <Button variant="outline">Browse FAQs</Button>
          </GlassCard>

          <GlassCard className="text-center">
            <Book className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">Documentation</h3>
            <p className="text-slate-600 mb-4">Comprehensive guides and documentation</p>
            <Button variant="outline">View Docs</Button>
          </GlassCard>

          <GlassCard className="text-center">
            <Video className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">Video Tutorials</h3>
            <p className="text-slate-600 mb-4">Step-by-step video walkthroughs</p>
            <Button variant="outline">Watch Videos</Button>
          </GlassCard>

          <GlassCard className="text-center">
            <MessageCircle className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">Live Chat</h3>
            <p className="text-slate-600 mb-4">Chat with our support team</p>
            <Button className="bg-primary-blue hover:bg-blue-700 text-white">Start Chat</Button>
          </GlassCard>
        </div>

        {/* Popular Articles */}
        <GlassCard>
          <h2 className="text-2xl font-bold text-slate-dark mb-6">Popular Help Articles</h2>
          <div className="space-y-4">
            {[
              "How to add and manage properties",
              "Setting up automated analytics",
              "Understanding occupancy rate calculations", 
              "Managing tenant communications",
              "Generating financial reports"
            ].map((article, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                <span className="text-slate-700">{article}</span>
                <Button variant="ghost" size="sm">Read More</Button>
              </div>
            ))}
          </div>
        </GlassCard>
      </main>

      <Footer />
    </div>
  );
}
