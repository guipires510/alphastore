
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

export interface AlphaUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password?: string;
}

interface UserStore {
  users: AlphaUser[];
  currentUser: AlphaUser | null;
  register: (user: AlphaUser) => { success: boolean; message: string };
  login: (email: string, password?: string) => { success: boolean; message: string };
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      register: (user) => {
        const emailExists = get().users.some((u) => u.email === user.email);
        if (emailExists) {
          return { success: false, message: "Este e-mail já está cadastrado." };
        }
        
        const cpfExists = get().users.some((u) => u.cpf === user.cpf);
        if (cpfExists) {
          return { success: false, message: "Este CPF já está cadastrado." };
        }

        const newUser = { ...user, id: `USR-${Date.now()}` };
        set({
          users: [...get().users, newUser],
          currentUser: newUser,
        });
        
        return { success: true, message: "Conta criada com sucesso!" };
      },
      login: (email, password) => {
        const user = get().users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        
        if (user) {
          set({ currentUser: user });
          return { success: true, message: "Login realizado com sucesso." };
        }
        
        return { success: false, message: "E-mail ou senha inválidos." };
      },
      logout: () => set({ currentUser: null }),
    }),
    {
      name: 'alphaflow-users',
    }
  )
);
