import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCartStore } from '@/lib/cart-store';

export function Header() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openCart, getItemCount } = useCartStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const cartItemCount = getItemCount();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-playfair font-bold text-burgundy">Banna</h1>
            <span className="ml-2 text-sm text-gray-500 hidden sm:block">Premium Sarees</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-burgundy transition-colors">
              Collections
            </Link>
            <Link href="/?category=Silk Sarees" className="text-gray-700 hover:text-burgundy transition-colors">
              Silk Sarees
            </Link>
            <Link href="/?category=Cotton Sarees" className="text-gray-700 hover:text-burgundy transition-colors">
              Cotton Sarees
            </Link>
            <Link href="/?category=Designer Collection" className="text-gray-700 hover:text-burgundy transition-colors">
              Designer
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-burgundy transition-colors">
              Admin
            </Link>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <Input
                type="search"
                placeholder="Search sarees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </form>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="relative text-gray-600 hover:text-burgundy"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-saffron text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* User Button */}
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-burgundy">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="search"
                      placeholder="Search sarees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4">
                    <Link
                      href="/"
                      className="text-gray-700 hover:text-burgundy transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Collections
                    </Link>
                    <Link
                      href="/?category=Silk Sarees"
                      className="text-gray-700 hover:text-burgundy transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Silk Sarees
                    </Link>
                    <Link
                      href="/?category=Cotton Sarees"
                      className="text-gray-700 hover:text-burgundy transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Cotton Sarees
                    </Link>
                    <Link
                      href="/?category=Designer Collection"
                      className="text-gray-700 hover:text-burgundy transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Designer
                    </Link>
                    <Link
                      href="/admin"
                      className="text-gray-700 hover:text-burgundy transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
