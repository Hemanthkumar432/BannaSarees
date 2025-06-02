import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { Search, ShoppingBag, Menu, User } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const { items, toggleCart } = useCart();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-playfair font-bold text-primary cursor-pointer">
              Banna
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    location === item.href 
                      ? "text-primary" 
                      : "text-foreground hover:text-primary"
                  }`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            {searchOpen ? (
              <div className="flex items-center">
                <Input
                  placeholder="Search sarees..."
                  className="w-64"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCart}
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            {/* Admin Link */}
            <Link href="/admin">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <User className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary cursor-pointer">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <Input placeholder="Search sarees..." className="mb-4" />
                    
                    <Button
                      onClick={toggleCart}
                      variant="outline"
                      className="w-full mb-2"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Cart ({itemCount})
                    </Button>
                    
                    <Link href="/admin">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <User className="h-4 w-4 mr-2" />
                        Admin
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
