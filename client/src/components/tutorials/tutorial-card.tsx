import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { PlayCircle, CheckCircle, Lock, Clock } from "lucide-react";
import type { Tutorial, TutorialProgress } from "@shared/schema";

interface TutorialCardProps {
  tutorial: Tutorial;
  progress?: TutorialProgress;
  onStart?: (tutorial: Tutorial) => void;
  onContinue?: (tutorial: Tutorial) => void;
}

export default function TutorialCard({ 
  tutorial, 
  progress, 
  onStart, 
  onContinue 
}: TutorialCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  const getProgressPercentage = () => {
    return progress?.progressPercent || 0;
  };

  const isCompleted = () => {
    return progress?.completed || false;
  };

  const isStarted = () => {
    return progress && progress.progressPercent > 0;
  };

  const defaultThumbnail = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";

  return (
    <GlassCard className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow p-0">
      <div className="relative">
        <img
          src={tutorial.thumbnailUrl || defaultThumbnail}
          alt={tutorial.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultThumbnail;
          }}
        />
        <div className="absolute top-4 right-4">
          <Badge className={getDifficultyColor(tutorial.difficulty)}>
            {getDifficultyLabel(tutorial.difficulty)}
          </Badge>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-dark font-['Poppins'] line-clamp-1">
            {tutorial.title}
          </h3>
        </div>
        
        {tutorial.description && (
          <p className="text-slate-600 mb-4 line-clamp-2">
            {tutorial.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-slate-500 text-sm">
            <PlayCircle size={16} className="mr-2" />
            <span>{tutorial.duration || 0} minutes</span>
            {tutorial.category && (
              <>
                <span className="mx-2">•</span>
                <span>{tutorial.category}</span>
              </>
            )}
          </div>
          
          {isStarted() && !isCompleted() && (
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-blue transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              <span className="text-xs text-slate-500">{getProgressPercentage()}%</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          {isCompleted() ? (
            <Button
              disabled
              className="w-full bg-success-green text-white"
            >
              <CheckCircle size={16} className="mr-2" />
              Completed
            </Button>
          ) : isStarted() ? (
            <Button
              onClick={() => onContinue?.(tutorial)}
              className="w-full bg-primary-blue hover:bg-blue-700 text-white font-medium transition-colors"
            >
              <PlayCircle size={16} className="mr-2" />
              Continue Learning
            </Button>
          ) : (
            <Button
              onClick={() => onStart?.(tutorial)}
              className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium transition-colors"
            >
              <Lock size={16} className="mr-2" />
              Start Tutorial
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
