import { create } from "zustand";
import type { ProductProps } from "../../../../pages/index.astro";
import { persist } from "zustand/middleware";

type CartProduct = ProductProps & { quantity?: number };

interface CartState {
  open: boolean;
  products: CartProduct[];
  quantity: object;
  addToCart: (id: string, product: ProductProps) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  setOpen: (open: boolean) => void;
}

const name = "product-storage";

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      open: false,
      products: [],
      quantity: {},
      setOpen: (open) => set({ open }),
      addToCart: (id: string, product: ProductProps) =>
        set(({ products }) => ({
          products: [...products, { ...product }],
        })),
      setQuantity: (productId, newQuantity) =>
        set((state) => ({
          ...state,
          quantity: { id: productId, count: newQuantity },
        })),
      removeFromCart: (productId) =>
        set(({ products }) => ({
          products: products.filter(
            (cartProduct) => cartProduct.id !== productId
          ),
        })),
    }),
    { name }
  )
);
