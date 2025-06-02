import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/product-card';
import { CartSidebar } from '@/components/cart-sidebar';
import type { Product } from '@shared/schema';

export default function Home() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Parse URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const search = urlParams.get('search') || '';
    const cat = urlParams.get('category') || '';
    
    setSearchQuery(search);
    setCategory(cat);
  }, [location]);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products', { category, search: searchQuery }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
  });

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const categories = ['Silk Sarees', 'Cotton Sarees', 'Designer Collection', 'Handloom'];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-50 to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl lg:text-6xl font-playfair font-bold text-gray-900 leading-tight">
                Timeless Elegance in Every Thread
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Discover our exquisite collection of handwoven sarees, where traditional craftsmanship meets contemporary style. Each piece tells a story of heritage and artistry.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button className="bg-burgundy text-white hover:burgundy-600">
                  Explore Collections
                </Button>
                <Button variant="outline" className="border-burgundy text-burgundy hover:bg-red-50">
                  View Lookbook
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="https://pixabay.com/get/g9af89d64beebb680954afb8ef4776a1e9bc65cd1410706d81c4e6797ee7cb505c8e8b57e62a1235158da3bce9ee25413167a6951564a50ce8eed9bf41cd43294_1280.jpg"
                alt="Elegant Indian woman in traditional saree"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant={category === '' ? 'default' : 'outline'}
              onClick={() => setCategory('')}
              className={category === '' ? 'bg-burgundy text-white' : 'text-burgundy border-burgundy'}
            >
              All Collections
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? 'default' : 'outline'}
                onClick={() => setCategory(cat)}
                className={category === cat ? 'bg-burgundy text-white' : 'text-burgundy border-burgundy'}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters and Sorting */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-playfair font-bold text-gray-900">
                {category || searchQuery ? 
                  `${category || 'Search Results'} ${searchQuery ? `for "${searchQuery}"` : ''}` : 
                  'Featured Collections'
                }
              </h3>
              <p className="text-gray-600 mt-1">
                {products.length} {products.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            <div className="flex gap-4 w-full lg:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm animate-pulse">
                  <div className="w-full h-64 bg-gray-200 rounded-t-2xl"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Grid className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">
                {searchQuery || category ? 
                  'Try adjusting your search or filters to find what you\'re looking for.' :
                  'Our collection is being updated. Please check back soon!'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-burgundy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-playfair font-bold mb-4">
            Stay Connected with Banna
          </h3>
          <p className="text-red-100 text-lg mb-8">
            Get early access to new collections, exclusive offers, and styling tips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white text-black"
            />
            <Button className="bg-saffron hover:saffron-600 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <CartSidebar />
    </div>
  );
}
