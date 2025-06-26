import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

interface RoleSelectorProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
  availableRoles?: string[];
}

export default function RoleSelector({ 
  selectedRole, 
  onRoleChange, 
  availableRoles = ['agent', 'manager', 'admin', 'investor'] 
}: RoleSelectorProps) {
  const getRoleLabel = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="flex justify-center mb-8">
      <GlassCard className="p-2 inline-flex space-x-1">
        {availableRoles.map((role) => (
          <Button
            key={role}
            variant="ghost"
            className={cn(
              "px-6 py-2 rounded-lg font-medium transition-all",
              selectedRole === role
                ? "bg-primary-blue text-white shadow-sm"
                : "text-slate-600 hover:bg-white/50"
            )}
            onClick={() => onRoleChange(role)}
          >
            {getRoleLabel(role)}
          </Button>
        ))}
      </GlassCard>
    </div>
  );
}
