import { useState, useEffect } from "react";
import { useQuery, useMutation, queryClient } from "@tanstack/react-query";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import AIChatbot from "@/components/ai/chatbot";
import PropertyCard from "@/components/property/property-card";
import PropertySearch from "@/components/property/property-search";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Plus } from "lucide-react";
import type { PropertyFilters } from "@/types";
import type { Property } from "@shared/schema";

export default function Properties() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [filters, setFilters] = useState<PropertyFilters>({ limit: 12, offset: 0 });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const { 
    data: properties, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['/api/properties', filters],
    retry: false,
  });

  useEffect(() => {
    if (error && isUnauthorizedError(error as Error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [error, toast]);

  const handleSearch = (newFilters: PropertyFilters) => {
    setFilters({ ...newFilters, limit: 12, offset: 0 });
  };

  const handleLoadMore = () => {
    setFilters(prev => ({
      ...prev,
      offset: (prev.offset || 0) + (prev.limit || 12)
    }));
  };

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    // In a real app, this would navigate to a detailed property page
    toast({
      title: "Property Details",
      description: `Viewing details for ${property.title}`,
    });
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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-dark mb-4 font-['Poppins']">
                Featured Properties
              </h1>
              <p className="text-xl text-slate-600">
                Discover exceptional real estate opportunities with our advanced search and filtering capabilities
              </p>
            </div>
            
            {(user?.role === 'agent' || user?.role === 'admin') && (
              <Button
                onClick={() => {
                  toast({
                    title: "Add Property",
                    description: "Property creation form would open here",
                  });
                }}
                className="bg-primary-blue hover:bg-blue-700 text-white font-medium"
              >
                <Plus className="mr-2" size={16} />
                Add Property
              </Button>
            )}
          </div>

          {/* Search and Filters */}
          <PropertySearch onSearch={handleSearch} loading={isLoading} />

          {/* Properties Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <GlassCard key={index} className="p-0">
                  <Skeleton className="w-full h-64 rounded-t-2xl" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex justify-between">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : error ? (
            <GlassCard className="text-center py-12">
              <h3 className="text-xl font-semibold text-slate-dark mb-4">
                Failed to Load Properties
              </h3>
              <p className="text-slate-600 mb-6">
                There was an error loading the property listings. Please try again.
              </p>
              <Button onClick={() => refetch()} className="bg-primary-blue hover:bg-blue-700 text-white">
                Retry
              </Button>
            </GlassCard>
          ) : !properties || properties.length === 0 ? (
            <GlassCard className="text-center py-12">
              <h3 className="text-xl font-semibold text-slate-dark mb-4">
                No Properties Found
              </h3>
              <p className="text-slate-600 mb-6">
                No properties match your current search criteria. Try adjusting your filters.
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
                {properties.map((property: Property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              {/* Load More */}
              {properties.length >= (filters.limit || 12) && (
                <div className="text-center">
                  <Button
                    onClick={handleLoadMore}
                    className="bg-primary-blue hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold font-['Poppins']"
                  >
                    <Plus className="mr-2" size={20} />
                    Load More Properties
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <AIChatbot />
      <Footer />
    </div>
  );
}
