
import { Navigation } from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Calendar, Award } from "lucide-react";

export default function Community() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-dark mb-6 font-['Poppins']">
            Community
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Connect with fellow real estate professionals and share knowledge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <GlassCard className="text-center">
            <Users className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">Forums</h3>
            <p className="text-slate-600 mb-4">Join discussions and get advice</p>
            <Button variant="outline">Join Forums</Button>
          </GlassCard>

          <GlassCard className="text-center">
            <MessageSquare className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">Q&A</h3>
            <p className="text-slate-600 mb-4">Ask questions and help others</p>
            <Button variant="outline">Browse Q&A</Button>
          </GlassCard>

          <GlassCard className="text-center">
            <Calendar className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">Events</h3>
            <p className="text-slate-600 mb-4">Attend webinars and meetups</p>
            <Button variant="outline">View Events</Button>
          </GlassCard>

          <GlassCard className="text-center">
            <Award className="text-primary-blue mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-slate-dark mb-3">Recognition</h3>
            <p className="text-slate-600 mb-4">Earn badges and achievements</p>
            <Button variant="outline">View Leaderboard</Button>
          </GlassCard>
        </div>

        <GlassCard>
          <h2 className="text-2xl font-bold text-slate-dark mb-6">Recent Discussions</h2>
          <div className="space-y-4">
            {[
              { title: "Best practices for property valuation", replies: 23, views: 145 },
              { title: "Market analysis tools comparison", replies: 18, views: 98 },
              { title: "Tenant screening procedures", replies: 34, views: 203 },
              { title: "Investment property financing options", replies: 27, views: 167 }
            ].map((discussion, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-slate-dark">{discussion.title}</h4>
                  <div className="text-sm text-slate-500 mt-1">
                    {discussion.replies} replies · {discussion.views} views
                  </div>
                </div>
                <Button size="sm" variant="ghost">Join</Button>
              </div>
            ))}
          </div>
        </GlassCard>
      </main>

      <Footer />
    </div>
  );
}
