import Header from "@/components/header";
import Hero from "@/components/hero";
import ProductGrid from "@/components/product-grid";
import FiltersSidebar from "@/components/filters-sidebar";
import CartSidebar from "@/components/cart-sidebar";
import Footer from "@/components/footer";
import { useState } from "react";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "All Categories",
    minPrice: "",
    maxPrice: "",
    sortBy: "Featured"
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <FiltersSidebar 
            filters={filters} 
            onFiltersChange={setFilters}
          />
          <ProductGrid filters={filters} />
        </div>
      </main>
      
      <Footer />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
}
