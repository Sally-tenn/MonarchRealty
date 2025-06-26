import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GlassCard } from "@/components/ui/glass-card";
import { Search } from "lucide-react";
import { useState } from "react";
import type { PropertyFilters } from "@/types";

interface PropertySearchProps {
  onSearch: (filters: PropertyFilters) => void;
  loading?: boolean;
}

export default function PropertySearch({ onSearch, loading }: PropertySearchProps) {
  const [filters, setFilters] = useState<PropertyFilters>({
    search: '',
    propertyType: '',
    status: '',
    minPrice: undefined,
    maxPrice: undefined,
    bedrooms: undefined,
    bathrooms: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleFilterChange = (key: keyof PropertyFilters, value: string | number | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === '' ? undefined : value
    }));
  };

  return (
    <GlassCard className="mb-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Location
            </label>
            <Input
              type="text"
              placeholder="Enter city or ZIP"
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="glass-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Property Type
            </label>
            <Select
              value={filters.propertyType || ''}
              onValueChange={(value) => handleFilterChange('propertyType', value)}
            >
              <SelectTrigger className="glass-input">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="single_family">Single Family</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="multi_family">Multi-Family</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Status
            </label>
            <Select
              value={filters.status || ''}
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger className="glass-input">
                <SelectValue placeholder="Any Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Status</SelectItem>
                <SelectItem value="for_sale">For Sale</SelectItem>
                <SelectItem value="for_rent">For Rent</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bedrooms
            </label>
            <Select
              value={filters.bedrooms?.toString() || ''}
              onValueChange={(value) => handleFilterChange('bedrooms', value ? parseInt(value) : undefined)}
            >
              <SelectTrigger className="glass-input">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-blue hover:bg-blue-700 text-white font-medium transition-colors"
            >
              <Search size={16} className="mr-2" />
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </div>

        {/* Advanced Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-glass-border">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Min Price
            </label>
            <Input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
              className="glass-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Max Price
            </label>
            <Input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
              className="glass-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bathrooms
            </label>
            <Select
              value={filters.bathrooms?.toString() || ''}
              onValueChange={(value) => handleFilterChange('bathrooms', value ? parseFloat(value) : undefined)}
            >
              <SelectTrigger className="glass-input">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="1.5">1.5+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="2.5">2.5+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </GlassCard>
  );
}