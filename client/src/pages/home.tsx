import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/product/product-card";
import { type Product, type Category } from "@shared/schema";

export default function Home() {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: featuredProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products", { featured: true }],
    queryFn: () => fetch("/api/products?featured=true").then(res => res.json()),
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')] bg-cover bg-center opacity-10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-foreground mb-6 leading-tight">
                Exquisite <span className="text-primary">Sarees</span> for Every Occasion
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Discover our curated collection of traditional and contemporary sarees, crafted with the finest fabrics and intricate designs.
              </p>
              <div className="space-x-4">
                <Link href="/products">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-white">
                    View Collections
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://pixabay.com/get/g113549d78ecea04d4ac3c0da90156d8c44412a4a3722b7a6004beabc2726804a0a8840f02e89e665ce169051ebe2a81fc707e8ffd0fcf4dc795f101f9e4fb2a6_1280.jpg" 
                alt="Elegant woman in traditional saree" 
                className="rounded-2xl shadow-2xl w-full h-auto max-w-lg mx-auto"
              />
              <Card className="absolute -bottom-6 -left-6 bg-white shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-playfair font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">Featured Collections</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our handpicked selection of premium sarees from different regions of India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => {
              const categoryImages: Record<string, string> = {
                "Silk Sarees": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
                "Cotton Sarees": "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
                "Designer Sarees": "https://pixabay.com/get/g3ff992faa76e51012105a7fc11e76de93a5420ac09aae8710a78fcac17a6d224670a6bf24a7d20c7a4ea56787d303af71c69f38089412eb1e9a8de275d6a831c_1280.jpg"
              };

              const startingPrices: Record<string, string> = {
                "Silk Sarees": "₹15,000",
                "Cotton Sarees": "₹3,000",
                "Designer Sarees": "₹25,000"
              };

              return (
                <Link key={category.id} href={`/products?categoryId=${category.id}`}>
                  <div className="group cursor-pointer">
                    <img 
                      src={categoryImages[category.name] || categoryImages["Silk Sarees"]}
                      alt={`${category.name} collection`}
                      className="w-full h-80 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground mt-2">{category.description}</p>
                      <p className="text-primary font-medium mt-2">
                        Starting from {startingPrices[category.name] || "₹5,000"}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-playfair font-bold text-foreground mb-4">Featured Products</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Handpicked sarees from our premium collection
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/products">
                <Button size="lg" variant="outline">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
