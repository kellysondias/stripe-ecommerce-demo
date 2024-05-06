import { create } from "zustand";
import type { ProductProps } from "../../../../pages/index.astro";
import { persist } from "zustand/middleware";

interface Details {
  id?: string;
  quantity?: number;
  size?: "XS" | "S" | "M" | "L" | "XL" | "XXL";
}

type CartProduct = ProductProps & Details;

interface CartState {
  open: boolean;
  products: CartProduct[];
  details: Details[] | {};
  addToCart: (id: string, product: ProductProps) => void;
  setDetails: (id: string, details: Partial<Details>) => void;
  removeFromCart: (productId: string) => void;
  setOpen: (open: boolean) => void;
}

const name = "product-storage";

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      open: false,
      products: [],
      details: {},
      setOpen: (open) => set({ open }),
      addToCart: (id: string, product: ProductProps) => {
        set(({ products, details }) => ({
          products: [...products, { ...product, ...details }],
        }));
      },
      setDetails: (id, newDetails) =>
        set(({ details }) => ({
          details: {
            ...details,
            id,
            ...newDetails,
          },
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
