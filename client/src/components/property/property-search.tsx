import { useState } from "react";
import { Search, Filter, MapPin, Home, DollarSign, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function PropertySearch() {
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    propertyType: "any",
    priceRange: "any",
    bedrooms: "any",
    bathrooms: "any",
  });

  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Location Search */}
        <div className="lg:col-span-2">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <Input
              placeholder="Enter location..."
              value={searchFilters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="pl-10 h-12 border-slate-200 focus:border-primary-blue"
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="relative">
          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 z-10" size={18} />
          <Select
            value={searchFilters.propertyType}
            onValueChange={(value) => handleFilterChange("propertyType", value)}
          >
            <SelectTrigger className="pl-10 h-12 border-slate-200 focus:border-primary-blue">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Type</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 z-10" size={18} />
          <Select
            value={searchFilters.priceRange}
            onValueChange={(value) => handleFilterChange("priceRange", value)}
          >
            <SelectTrigger className="pl-10 h-12 border-slate-200 focus:border-primary-blue">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Price</SelectItem>
              <SelectItem value="0-100000">Under $100K</SelectItem>
              <SelectItem value="100000-250000">$100K - $250K</SelectItem>
              <SelectItem value="250000-500000">$250K - $500K</SelectItem>
              <SelectItem value="500000-750000">$500K - $750K</SelectItem>
              <SelectItem value="750000-1000000">$750K - $1M</SelectItem>
              <SelectItem value="1000000+">$1M+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div className="relative">
          <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 z-10" size={18} />
          <Select
            value={searchFilters.bedrooms}
            onValueChange={(value) => handleFilterChange("bedrooms", value)}
          >
            <SelectTrigger className="pl-10 h-12 border-slate-200 focus:border-primary-blue">
              <SelectValue placeholder="Bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="1.5">1.5+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 z-10" size={18} />
          <Select
            value={searchFilters.bathrooms}
            onValueChange={(value) => handleFilterChange("bathrooms", value)}
          >
            <SelectTrigger className="pl-10 h-12 border-slate-200 focus:border-primary-blue">
              <SelectValue placeholder="Bathrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="1.5">1.5+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div>
          <Button className="w-full h-12 gradient-bg text-white font-semibold hover:opacity-90 transition-opacity">
            <Search size={18} className="mr-2" />
            Search
          </Button>
        </div>
      </div>
    </Card>
  );
}