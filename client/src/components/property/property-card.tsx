import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
  onViewDetails?: (property: Property) => void;
}

export default function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'for_sale': return 'bg-green-500';
      case 'for_rent': return 'bg-orange-500';
      case 'sold': return 'bg-gray-500';
      case 'rented': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'for_sale': return 'For Sale';
      case 'for_rent': return 'For Rent';
      case 'sold': return 'Sold';
      case 'rented': return 'Rented';
      default: return status;
    }
  };

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    if (property.status === 'for_rent') {
      return `$${numPrice.toLocaleString()}/mo`;
    }
    return `$${numPrice.toLocaleString()}`;
  };

  const defaultImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
  const imageUrl = property.imageUrls?.[0] || defaultImage;

  return (
    <GlassCard className="property-card overflow-hidden shadow-lg p-0">
      <div className="relative">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-64 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImage;
          }}
        />
        <div className="absolute top-4 right-4">
          <Badge className={`${getStatusColor(property.status)} text-white font-medium`}>
            {getStatusLabel(property.status)}
          </Badge>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-slate-dark font-['Poppins'] line-clamp-1">
            {property.title}
          </h3>
        </div>
        
        {property.description && (
          <p className="text-slate-600 mb-4 line-clamp-2">
            {property.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-primary-blue font-['Poppins']">
            {formatPrice(property.price)}
          </div>
          <div className="flex items-center space-x-4 text-slate-600 text-sm">
            {property.bedrooms > 0 && (
              <span className="flex items-center">
                <Bed size={16} className="mr-1" />
                {property.bedrooms} beds
              </span>
            )}
            {property.bathrooms && parseFloat(property.bathrooms) > 0 && (
              <span className="flex items-center">
                <Bath size={16} className="mr-1" />
                {property.bathrooms} baths
              </span>
            )}
            {property.squareFootage && (
              <span className="flex items-center">
                <Square size={16} className="mr-1" />
                {property.squareFootage.toLocaleString()} sq ft
              </span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-slate-500 flex items-center text-sm">
            <MapPin size={16} className="mr-1" />
            {property.city}, {property.state}
          </span>
          <Button
            onClick={() => onViewDetails?.(property)}
            className="bg-primary-blue hover:bg-blue-700 text-white font-medium transition-colors"
          >
            View Details
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
