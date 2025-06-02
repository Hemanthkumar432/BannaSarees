import { create } from 'zustand';
import { apiRequest } from './queryClient';
import type { CartStore, CartItem } from './types';

// Generate a simple session ID
const generateSessionId = () => {
  return 'session-' + Math.random().toString(36).substr(2, 9);
};

const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  sessionId: getSessionId(),

  addItem: async (productId: number, quantity = 1) => {
    try {
      const sessionId = get().sessionId;
      await apiRequest('POST', '/api/cart', {
        productId,
        quantity,
      }, {
        'X-Session-Id': sessionId,
      });
      
      // Reload cart to get updated data
      await get().loadCart();
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      throw error;
    }
  },

  updateQuantity: async (itemId: number, quantity: number) => {
    try {
      if (quantity === 0) {
        await get().removeItem(itemId);
        return;
      }

      await apiRequest('PUT', `/api/cart/${itemId}`, { quantity });
      await get().loadCart();
    } catch (error) {
      console.error('Failed to update cart item:', error);
      throw error;
    }
  },

  removeItem: async (itemId: number) => {
    try {
      await apiRequest('DELETE', `/api/cart/${itemId}`);
      await get().loadCart();
    } catch (error) {
      console.error('Failed to remove cart item:', error);
      throw error;
    }
  },

  clearCart: async () => {
    try {
      const sessionId = get().sessionId;
      await apiRequest('DELETE', '/api/cart', undefined, {
        'X-Session-Id': sessionId,
      });
      set({ items: [] });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  },

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  getTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => {
      const price = parseFloat(item.product.price);
      return total + (price * item.quantity);
    }, 0);
  },

  getItemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },

  loadCart: async () => {
    try {
      const sessionId = get().sessionId;
      const response = await fetch('/api/cart', {
        headers: {
          'X-Session-Id': sessionId,
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to load cart');
      }
      
      const items = await response.json();
      set({ items });
    } catch (error) {
      console.error('Failed to load cart:', error);
      set({ items: [] });
    }
  },
}));
