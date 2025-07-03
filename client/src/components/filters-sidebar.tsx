import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FiltersSidebarProps {
  filters: {
    category: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
  };
  onFiltersChange: (filters: any) => void;
}

export default function FiltersSidebar({ filters, onFiltersChange }: FiltersSidebarProps) {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      category: "All Categories",
      minPrice: "",
      maxPrice: "",
      sortBy: "Featured"
    });
  };

  return (
    <aside className="lg:w-1/4">
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        
        <div className="mb-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </Label>
          <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Categories">All Categories</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Clothing">Clothing</SelectItem>
              <SelectItem value="Home & Garden">Home & Garden</SelectItem>
              <SelectItem value="Books">Books</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
              className="w-1/2"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
              className="w-1/2"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <Label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </Label>
          <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Featured">Featured</SelectItem>
              <SelectItem value="Price: Low to High">Price: Low to High</SelectItem>
              <SelectItem value="Price: High to Low">Price: High to Low</SelectItem>
              <SelectItem value="Newest">Newest</SelectItem>
              <SelectItem value="Best Rated">Best Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={resetFilters}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Reset Filters
        </Button>
      </div>
    </aside>
  );
}
