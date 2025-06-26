import { GlassCard } from "@/components/ui/glass-card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyticsWidgetProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    label: string;
  };
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export default function AnalyticsWidget({ 
  title, 
  value, 
  change, 
  icon, 
  color = 'blue' 
}: AnalyticsWidgetProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green': return 'text-success-green';
      case 'purple': return 'text-secondary-purple';
      case 'orange': return 'text-orange-500';
      case 'red': return 'text-red-500';
      default: return 'text-primary-blue';
    }
  };

  const getTrendIcon = (changeValue: number) => {
    if (changeValue > 0) return <TrendingUp size={16} className="text-green-500" />;
    if (changeValue < 0) return <TrendingDown size={16} className="text-red-500" />;
    return <Minus size={16} className="text-gray-500" />;
  };

  const getTrendColor = (changeValue: number) => {
    if (changeValue > 0) return 'text-green-500';
    if (changeValue < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <GlassCard className="dashboard-widget">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        {icon && (
          <div className={cn("text-xl", getColorClasses(color))}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <div className={cn("text-3xl font-bold font-['Poppins']", getColorClasses(color))}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
      </div>
      
      {change && (
        <div className="flex items-center space-x-2">
          {getTrendIcon(change.value)}
          <span className={cn("text-sm font-medium", getTrendColor(change.value))}>
            {Math.abs(change.value)}% {change.value >= 0 ? 'increase' : 'decrease'}
          </span>
          <span className="text-slate-500 text-sm">{change.label}</span>
        </div>
      )}
    </GlassCard>
  );
}
