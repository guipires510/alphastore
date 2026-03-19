
"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const existingItem = get().items.find(
          (item) => 
            item.id === newItem.id && 
            item.size === newItem.size && 
            item.color === newItem.color
        );
        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
          });
        } else {
          set({ items: [...get().items, newItem] });
        }
      },
      removeItem: (id, size, color) => {
        set({
          items: get().items.filter((item) => 
            !(item.id === id && item.size === size && item.color === color)
          ),
        });
      },
      updateQuantity: (id, size, color, quantity) => {
        if (quantity < 1) {
          get().removeItem(id, size, color);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id && item.size === size && item.color === color 
              ? { ...item, quantity } 
              : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      total: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'alphaflow-cart',
    }
  )
);
