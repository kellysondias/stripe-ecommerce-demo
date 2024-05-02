//cart store
import { create } from "zustand";
import type { ProductProps } from "../../../../pages/index.astro";

type CartProduct = ProductProps & { quantity?: number };

interface CartState {
  products: CartProduct[];
  addToCart: (item: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>((set) => ({
  open: false,
  products: [],
  setOpen: (open) => set({ open }),
  addToCart: (product) =>
    set(({ products }) => ({ products: [...products, product] })),
  removeFromCart: (productId) =>
    set(({ products }) => ({
      products: products.filter((cartProduct) => cartProduct.id !== productId),
    })),
}));
