import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Quality Products for Everyone
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Discover amazing deals on products you love
          </p>
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            size="lg"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
}
