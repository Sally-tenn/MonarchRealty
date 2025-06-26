
import { Navigation } from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, Search, Book, MessageCircle } from "lucide-react";

export default function Help() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-dark mb-6 font-['Poppins']">
            Help Center
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Find answers to your questions and get the help you need.
          </p>
        </div>

        <GlassCard className="mb-12">
          <div className="flex gap-4">
            <Input placeholder="Search for help articles..." className="flex-1" />
            <Button className="bg-primary-blue hover:bg-blue-700 text-white">
              <Search className="mr-2" size={16} />
              Search
            </Button>
          </div>
        </GlassCard>

        <div className="grid md:grid-cols-3 gap-8">
          <GlassCard className="text-center">
            <HelpCircle className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">FAQs</h3>
            <p className="text-slate-600 mb-4">Common questions and answers</p>
            <Button variant="outline">View FAQs</Button>
          </GlassCard>

          <GlassCard className="text-center">
            <Book className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">Guides</h3>
            <p className="text-slate-600 mb-4">Step-by-step tutorials</p>
            <Button variant="outline">Browse Guides</Button>
          </GlassCard>

          <GlassCard className="text-center">
            <MessageCircle className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">Contact</h3>
            <p className="text-slate-600 mb-4">Get in touch with support</p>
            <Button className="bg-primary-blue hover:bg-blue-700 text-white">Contact Us</Button>
          </GlassCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
