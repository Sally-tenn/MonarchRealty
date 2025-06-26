
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Puzzle, Webhook, Database, Cloud } from "lucide-react";

export default function Integrations() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-dark mb-6 font-['Poppins']">
            Integrations
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Connect PropertyHub with your favorite tools and platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <GlassCard className="text-center">
            <Puzzle className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">Third-Party Apps</h3>
            <p className="text-slate-600 mb-4">Connect with popular business tools</p>
            <Button variant="outline">Explore</Button>
          </GlassCard>

          <GlassCard className="text-center">
            <Webhook className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">Webhooks</h3>
            <p className="text-slate-600 mb-4">Real-time event notifications</p>
            <Button variant="outline">Setup</Button>
          </GlassCard>

          <GlassCard className="text-center">
            <Database className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">Data Sync</h3>
            <p className="text-slate-600 mb-4">Synchronize with external databases</p>
            <Button variant="outline">Configure</Button>
          </GlassCard>

          <GlassCard className="text-center">
            <Cloud className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">Cloud Services</h3>
            <p className="text-slate-600 mb-4">Integrate with cloud platforms</p>
            <Button variant="outline">Connect</Button>
          </GlassCard>
        </div>

        <GlassCard>
          <h2 className="text-2xl font-bold text-slate-dark mb-6">Popular Integrations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Zapier", "Slack", "Google Workspace", 
              "Microsoft 365", "Salesforce", "QuickBooks",
              "DocuSign", "Mailchimp", "Stripe"
            ].map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                <span className="text-slate-700 font-medium">{integration}</span>
                <Button size="sm" variant="ghost">Connect</Button>
              </div>
            ))}
          </div>
        </GlassCard>
      </main>

      <Footer />
    </div>
  );
}
