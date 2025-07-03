import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product.id);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const generateStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 text-yellow-400 fill-current opacity-50" />
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {product.description}
        </p>
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {generateStars(parseFloat(product.rating))}
            <span className="text-gray-500 text-sm ml-1">
              ({product.rating})
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          <Button
            onClick={handleAddToCart}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
