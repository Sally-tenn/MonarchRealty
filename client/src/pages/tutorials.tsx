import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import AIChatbot from "@/components/ai/chatbot";
import TutorialCard from "@/components/tutorials/tutorial-card";
import ProgressTracker from "@/components/tutorials/progress-tracker";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Search, Filter, BookOpen, PlayCircle, Star } from "lucide-react";
import type { TutorialFilters } from "@/types";
import type { Tutorial } from "@shared/schema";

export default function Tutorials() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<TutorialFilters>({ limit: 12, offset: 0 });

  const { 
    data: tutorials, 
    isLoading: tutorialsLoading, 
    error: tutorialsError 
  } = useQuery({
    queryKey: ['/api/tutorials', filters],
    retry: false,
  });

  const { 
    data: userProgress, 
    isLoading: progressLoading,
    error: progressError 
  } = useQuery({
    queryKey: ['/api/tutorials/progress/me'],
    retry: false,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if ((tutorialsError && isUnauthorizedError(tutorialsError as Error)) ||
        (progressError && isUnauthorizedError(progressError as Error))) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [tutorialsError, progressError, toast]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would implement search functionality
    toast({
      title: "Search",
      description: `Searching for: ${searchQuery}`,
    });
  };

  const handleFilterChange = (key: keyof TutorialFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === '' ? undefined : value,
      offset: 0 // Reset pagination when filters change
    }));
  };

  const handleStartTutorial = (tutorial: Tutorial) => {
    toast({
      title: "Starting Tutorial",
      description: `Starting "${tutorial.title}"`,
    });
    // In a real app, this would navigate to the tutorial player
  };

  const handleContinueTutorial = (tutorial: Tutorial) => {
    toast({
      title: "Continuing Tutorial",
      description: `Continuing "${tutorial.title}"`,
    });
    // In a real app, this would navigate to the tutorial player
  };

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

  // Calculate progress statistics
  const completed = userProgress?.filter(p => p.completed).length || 0;
  const inProgress = userProgress?.filter(p => !p.completed && p.progressPercent > 0).length || 0;
  const notStarted = (tutorials?.length || 0) - completed - inProgress;
  const completionRate = tutorials?.length ? (completed / tutorials.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-dark mb-4 font-['Poppins']">
              Video Tutorial Library
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive learning resources with categorized tutorials and step-by-step guidance
            </p>
          </div>

          {/* Progress Overview */}
          {!progressLoading && userProgress && (
            <ProgressTracker
              completed={completed}
              inProgress={inProgress}
              notStarted={notStarted}
              completionRate={completionRate}
            />
          )}

          {/* Search and Filters */}
          <GlassCard className="mb-8">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Search tutorials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass-input"
                  />
                </div>
                <Button type="submit" className="bg-primary-blue hover:bg-blue-700 text-white">
                  <Search className="mr-2" size={16} />
                  Search
                </Button>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Difficulty
                </label>
                <Select
                  value={filters.difficulty || ''}
                  onValueChange={(value) => handleFilterChange('difficulty', value)}
                >
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <Select
                  value={filters.category || ''}
                  onValueChange={(value) => handleFilterChange('category', value)}
                >
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Property Management">Property Management</SelectItem>
                    <SelectItem value="Real Estate Basics">Real Estate Basics</SelectItem>
                    <SelectItem value="Investment Analysis">Investment Analysis</SelectItem>
                    <SelectItem value="Market Research">Market Research</SelectItem>
                    <SelectItem value="Legal & Compliance">Legal & Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={() => setFilters({ limit: 12, offset: 0 })}
                  variant="outline"
                  className="w-full"
                >
                  <Filter className="mr-2" size={16} />
                  Clear Filters
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Tutorial Grid */}
          {tutorialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <GlassCard key={index} className="p-0">
                  <Skeleton className="w-full h-48 rounded-t-2xl" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : tutorialsError ? (
            <GlassCard className="text-center py-12">
              <BookOpen className="mx-auto text-slate-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-slate-dark mb-4">
                Failed to Load Tutorials
              </h3>
              <p className="text-slate-600 mb-6">
                There was an error loading the tutorial library. Please try again.
              </p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-primary-blue hover:bg-blue-700 text-white"
              >
                Retry
              </Button>
            </GlassCard>
          ) : !tutorials || tutorials.length === 0 ? (
            <GlassCard className="text-center py-12">
              <BookOpen className="mx-auto text-slate-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-slate-dark mb-4">
                No Tutorials Found
              </h3>
              <p className="text-slate-600 mb-6">
                No tutorials match your current search criteria. Try adjusting your filters.
              </p>
              <Button 
                onClick={() => setFilters({ limit: 12, offset: 0 })}
                className="bg-primary-blue hover:bg-blue-700 text-white"
              >
                Clear Filters
              </Button>
            </GlassCard>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {tutorials.map((tutorial: Tutorial) => {
                  const progress = userProgress?.find(p => p.tutorialId === tutorial.id);
                  return (
                    <TutorialCard
                      key={tutorial.id}
                      tutorial={tutorial}
                      progress={progress}
                      onStart={handleStartTutorial}
                      onContinue={handleContinueTutorial}
                    />
                  );
                })}
              </div>

              {/* Load More */}
              {tutorials.length >= (filters.limit || 12) && (
                <div className="text-center">
                  <Button
                    onClick={() => setFilters(prev => ({ 
                      ...prev, 
                      offset: (prev.offset || 0) + (prev.limit || 12) 
                    }))}
                    className="bg-primary-blue hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold font-['Poppins']"
                  >
                    <PlayCircle className="mr-2" size={20} />
                    Load More Tutorials
                  </Button>
                </div>
              )}
            </>
          )}

          {/* AI-Powered Tutorial Recommendations */}
          <div className="mt-16">
            <GlassCard>
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                  alt="AI-powered real estate assistant"
                  className="w-32 h-24 object-cover rounded-xl mr-6"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-slate-dark mb-2 font-['Poppins']">
                    AI-Powered Real Estate Assistant
                  </h3>
                  <p className="text-slate-600">
                    Get intelligent guidance tailored to your specific needs and learning progress
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-dark mb-3">Smart Recommendations</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center">
                      <Star className="text-yellow-500 mr-3" size={16} />
                      Personalized tutorial suggestions based on your role
                    </li>
                    <li className="flex items-center">
                      <Star className="text-yellow-500 mr-3" size={16} />
                      Interactive Q&A for real estate scenarios
                    </li>
                    <li className="flex items-center">
                      <Star className="text-yellow-500 mr-3" size={16} />
                      Market insights and trend analysis
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-dark mb-3">Intelligent Solutions</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-center">
                      <Star className="text-yellow-500 mr-3" size={16} />
                      24/7 support for property management questions
                    </li>
                    <li className="flex items-center">
                      <Star className="text-yellow-500 mr-3" size={16} />
                      Video tutorial suggestions for specific challenges
                    </li>
                    <li className="flex items-center">
                      <Star className="text-yellow-500 mr-3" size={16} />
                      Smart insights for investment opportunities
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="bg-secondary-purple hover:bg-purple-700 text-white font-medium">
                  <PlayCircle className="mr-2" size={16} />
                  Get Started with AI Assistant
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>

      <AIChatbot />
      <Footer />
    </div>
  );
}
