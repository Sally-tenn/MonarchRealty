
import { Navigation } from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      title: "The Future of Real Estate Technology",
      excerpt: "Exploring how AI and automation are transforming property management.",
      date: "March 15, 2024",
      author: "Sarah Johnson",
      category: "Technology"
    },
    {
      title: "Market Trends Report Q1 2024",
      excerpt: "Comprehensive analysis of current real estate market conditions.",
      date: "March 12, 2024",
      author: "Michael Chen",
      category: "Market Analysis"
    },
    {
      title: "Property Investment Strategies",
      excerpt: "Expert tips for building a successful real estate portfolio.",
      date: "March 10, 2024",
      author: "Emma Wilson",
      category: "Investment"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-dark mb-6 font-['Poppins']">
            Blog
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Insights, trends, and expert advice from the world of real estate.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <GlassCard key={index}>
              <div className="mb-4">
                <span className="bg-primary-blue text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-dark mb-3">{post.title}</h3>
              <p className="text-slate-600 mb-4">{post.excerpt}</p>
              
              <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {post.date}
                </div>
                <div className="flex items-center gap-1">
                  <User size={14} />
                  {post.author}
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Read More
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </GlassCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-primary-blue hover:bg-blue-700 text-white">
            View All Posts
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
