import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    if (email) {
      toast({
        title: "Thank you for subscribing!",
        description: "We'll keep you updated on new collections and exclusive offers.",
      });
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <footer className="bg-foreground text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-4">Banna</h3>
            <p className="text-white/70 mb-4">
              Your trusted destination for authentic and premium sarees from across India.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer">
                    Our Collections
                  </span>
                </Link>
              </li>
              <li>
                <span className="text-white/70 hover:text-white transition-colors cursor-pointer">
                  Size Guide
                </span>
              </li>
              <li>
                <span className="text-white/70 hover:text-white transition-colors cursor-pointer">
                  Care Instructions
                </span>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact">
                  <span className="text-white/70 hover:text-white transition-colors cursor-pointer">
                    Contact Us
                  </span>
                </Link>
              </li>
              <li>
                <span className="text-white/70 hover:text-white transition-colors cursor-pointer">
                  Shipping Info
                </span>
              </li>
              <li>
                <span className="text-white/70 hover:text-white transition-colors cursor-pointer">
                  Returns & Exchanges
                </span>
              </li>
              <li>
                <span className="text-white/70 hover:text-white transition-colors cursor-pointer">
                  FAQ
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-white/70 mb-4">
              Subscribe to get updates on new collections and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <Input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="flex-1 rounded-r-none bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button 
                type="submit"
                className="rounded-l-none bg-primary hover:bg-primary/90"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/70">
            &copy; 2024 Banna. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
