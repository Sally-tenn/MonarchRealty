import { GlassCard } from "@/components/ui/glass-card";
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  completed: number;
  inProgress: number;
  notStarted: number;
  completionRate: number;
}

export default function ProgressTracker({ 
  completed, 
  inProgress, 
  notStarted, 
  completionRate 
}: ProgressTrackerProps) {
  const total = completed + inProgress + notStarted;

  return (
    <GlassCard className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-slate-dark font-['Poppins']">
          Your Learning Progress
        </h3>
        <span className="text-primary-blue font-semibold text-lg">
          {completionRate.toFixed(1)}% Complete
        </span>
      </div>
      
      <div className="mb-6">
        <Progress value={completionRate} className="h-3" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-blue font-['Poppins'] mb-1">
            {completed}
          </div>
          <div className="text-slate-600">Tutorials Completed</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-secondary-purple font-['Poppins'] mb-1">
            {inProgress}
          </div>
          <div className="text-slate-600">In Progress</div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-slate-600 font-['Poppins'] mb-1">
            {notStarted}
          </div>
          <div className="text-slate-600">Not Started</div>
        </div>
      </div>

      {total > 0 && (
        <div className="mt-6 pt-6 border-t border-glass-border">
          <div className="flex justify-between items-center text-sm text-slate-600">
            <span>Total Tutorials: {total}</span>
            <span>Average Progress: {((completed + inProgress * 0.5) / total * 100).toFixed(1)}%</span>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
