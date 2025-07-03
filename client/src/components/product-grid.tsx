import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import ProductCard from "./product-card";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
  filters: {
    category: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
  };
}

export default function ProductGrid({ filters }: ProductGridProps) {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (isLoading) {
    return (
      <div className="lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4">
              <Skeleton className="w-full h-48 mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2 mb-3" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lg:w-3/4">
        <div className="text-center py-12">
          <p className="text-red-500">Failed to load products. Please try again.</p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="lg:w-3/4">
        <div className="text-center py-12">
          <p className="text-gray-500">No products found.</p>
        </div>
      </div>
    );
  }

  // Filter products based on filters
  let filteredProducts = products;
  
  if (filters.category !== "All Categories") {
    filteredProducts = filteredProducts.filter(product => 
      product.category === filters.category
    );
  }
  
  if (filters.minPrice) {
    filteredProducts = filteredProducts.filter(product => 
      parseFloat(product.price) >= parseFloat(filters.minPrice)
    );
  }
  
  if (filters.maxPrice) {
    filteredProducts = filteredProducts.filter(product => 
      parseFloat(product.price) <= parseFloat(filters.maxPrice)
    );
  }
  
  // Sort products
  switch (filters.sortBy) {
    case "Price: Low to High":
      filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case "Price: High to Low":
      filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    case "Best Rated":
      filteredProducts.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      break;
    case "Newest":
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
    default:
      // Featured - keep original order
      break;
  }

  return (
    <div className="lg:w-3/4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
        <span className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
