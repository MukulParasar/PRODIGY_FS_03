import { Search, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

interface HeaderProps {
  onCartClick: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const { cartItems } = useCart();
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-800">LocalStore</div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Categories</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">About</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900 transition-colors">
              <Search className="w-6 h-6" />
            </button>
            <button className="text-gray-700 hover:text-gray-900 transition-colors">
              <User className="w-6 h-6" />
            </button>
            <button 
              onClick={onCartClick}
              className="text-gray-700 hover:text-gray-900 transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
