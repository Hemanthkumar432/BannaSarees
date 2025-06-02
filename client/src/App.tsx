import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartSidebar } from "@/components/cart-sidebar";
import Home from "@/pages/home";
import Admin from "@/pages/admin";
import ProductPage from "@/pages/product";
import NotFound from "@/pages/not-found";
import { useCartStore } from "@/lib/cart-store";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/product/:id" component={ProductPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { loadCart } = useCartStore();

  useEffect(() => {
    // Load cart on app start
    loadCart();
  }, [loadCart]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <CartSidebar />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
