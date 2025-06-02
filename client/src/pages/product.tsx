import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Heart, Share2, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/cart-store';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@shared/schema';

export default function ProductPage() {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['/api/products', id],
    queryFn: async () => {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      return response.json();
    },
    enabled: !!id,
  });

  const handleAddToCart = async () => {
    if (!product) return;

    if (product.stockQuantity === 0) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

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
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-burgundy"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const originalPrice = parseFloat(product.price);
  const discountedPrice = product.discountPercentage 
    ? originalPrice * (1 - product.discountPercentage / 100)
    : originalPrice;

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Collection
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <img
              src={product.imageUrl || '/placeholder-saree.jpg'}
              alt={product.name}
              className="w-full h-[600px] object-cover rounded-2xl"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4">{product.category}</Badge>
              <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-burgundy">
                    ₹{discountedPrice.toLocaleString()}
                  </span>
                  {product.discountPercentage && product.discountPercentage > 0 && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <Badge variant="destructive">
                    {product.discountPercentage}% OFF
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(24 reviews)</span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Availability:</span>
                  <span className={`font-medium ${
                    product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.stockQuantity > 0 ? 
                      `${product.stockQuantity} in stock` : 
                      'Out of stock'
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">SKU:</span>
                  <span className="text-gray-600">BN-{product.id.toString().padStart(4, '0')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className="w-full bg-burgundy hover:burgundy-600 text-white py-3 text-lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>

              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Product Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Premium quality fabric</li>
                <li>• Traditional handwoven design</li>
                <li>• Perfect for special occasions</li>
                <li>• Comes with matching blouse piece</li>
                <li>• Dry clean recommended</li>
              </ul>
            </div>

            {/* Size Guide */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Size Guide</h3>
              <p className="text-sm text-gray-600">
                Standard saree length: 6.3 meters (including 0.8m blouse piece)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
