import { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/cart-store';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@shared/schema';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    if (product.stockQuantity === 0) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await addItem(product.id);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const originalPrice = parseFloat(product.price);
  const discountedPrice = product.discountPercentage 
    ? originalPrice * (1 - product.discountPercentage / 100)
    : originalPrice;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow group">
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={product.imageUrl || '/placeholder-saree.jpg'}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors ${
            isLiked ? 'text-red-500' : 'text-gray-600'
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        </Button>

        {product.discountPercentage && product.discountPercentage > 0 && (
          <Badge className="absolute top-4 left-4 bg-red-500 text-white">
            {product.discountPercentage}% OFF
          </Badge>
        )}

        {product.stockQuantity === 0 && (
          <Badge className="absolute top-4 left-4 bg-gray-500 text-white">
            Out of Stock
          </Badge>
        )}

        {product.stockQuantity > 0 && product.stockQuantity < 10 && (
          <Badge className="absolute top-4 left-4 bg-orange-500 text-white">
            Low Stock
          </Badge>
        )}
      </div>

      <div className="p-6">
        <h4 className="font-playfair font-semibold text-lg text-gray-900">
          {product.name}
        </h4>
        <p className="text-gray-600 text-sm mt-1">{product.category}</p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-burgundy">
              ₹{discountedPrice.toLocaleString()}
            </span>
            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <Button
            onClick={handleAddToCart}
            disabled={isLoading || product.stockQuantity === 0}
            className="bg-burgundy text-white hover:burgundy-600 transition-colors"
            size="sm"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </>
            )}
          </Button>
        </div>

        {product.stockQuantity > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            {product.stockQuantity} in stock
          </p>
        )}
      </div>
    </div>
  );
}
