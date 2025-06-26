import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
  onSelect?: () => void;
}

export default function PricingCard({ 
  name, 
  price, 
  features, 
  popular, 
  onSelect 
}: PricingCardProps) {
  return (
    <GlassCard className={cn(
      "relative shadow-2xl",
      popular && "border-2 border-white/30"
    )}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 font-semibold">
            Most Popular
          </Badge>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4 font-['Poppins']">
          {name}
        </h3>
        <div className="text-5xl font-bold text-white mb-2 font-['Poppins']">
          ${price}
          <span className="text-lg text-blue-200">/month</span>
        </div>
        <p className="text-blue-200">
          {name === 'Starter' && 'Perfect for individual agents'}
          {name === 'Professional' && 'Ideal for growing teams'}
          {name === 'Enterprise' && 'For large organizations'}
        </p>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-white">
            <Check size={16} className="text-green-400 mr-3 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        onClick={onSelect}
        className={cn(
          "w-full py-4 font-semibold text-lg transition-colors font-['Poppins']",
          popular
            ? "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
            : "bg-white text-primary-blue hover:bg-blue-50"
        )}
      >
        {name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
      </Button>
    </GlassCard>
  );
}
