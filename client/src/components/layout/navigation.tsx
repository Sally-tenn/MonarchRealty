import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { Crown, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: "/properties", label: "Properties" },
    { href: "/dashboard/agent", label: "Dashboard" },
    { href: "/tutorials", label: "Tutorials" },
    { href: "/pricing", label: "Pricing" },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'manager': return 'bg-purple-500';
      case 'agent': return 'bg-blue-500';
      case 'investor': return 'bg-green-500';
      case 'vendor': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Crown className="text-white text-lg" size={20} />
          </div>
          <h1 className="text-xl font-bold text-slate-dark font-['Poppins']">
            Monarch Property
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {isAuthenticated && navigationItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "text-slate-600 hover:text-primary-blue transition-colors font-medium",
                location === item.href && "text-primary-blue"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <>
              <Badge className={cn("text-white font-medium", getRoleColor(user.role || 'user'))}>
                {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'User'}
              </Badge>
              <GlassCard className="px-4 py-2 hover:bg-white/20 transition-colors cursor-pointer">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span className="text-slate-dark font-medium">
                    {user.firstName || user.email || 'Profile'}
                  </span>
                </div>
              </GlassCard>
              <Button
                variant="ghost"
                onClick={() => window.location.href = '/api/logout'}
                className="text-slate-600"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/api/login">
              <Button variant="default" size="sm" className="bg-primary-blue hover:bg-blue-700 text-white px-6">
                Get Started
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 glass-card rounded-xl p-4">
          <div className="flex flex-col space-y-4">
            {isAuthenticated && navigationItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "block px-4 py-2 text-slate-600 hover:text-primary-blue transition-colors font-medium rounded-lg",
                  location === item.href && "text-primary-blue bg-blue-50"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated && user ? (
              <div className="pt-4 border-t border-glass-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge className={cn("text-white font-medium", getRoleColor(user.role || 'user'))}>
                    {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'User'}
                  </Badge>
                  <span className="text-slate-dark font-medium">
                    {user.firstName || user.email || 'Profile'}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/api/logout'}
                  className="w-full"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => window.location.href = '/api/login'}
                className="w-full bg-primary-blue hover:bg-blue-700 text-white font-medium"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}