import { create } from "zustand";
import type { ProductProps } from "../../../../pages/index.astro";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

interface Details {
  id?: string;
  quantity?: number;
  size?: "XS" | "S" | "M" | "L" | "XL" | "XXL";
}

export type CartProduct = ProductProps & Details;

interface CartState {
  open: boolean;
  products: CartProduct[];
  details: Details[] | {};
  addToCart: (product: ProductProps) => void;
  setDetail: (id: string, details: Partial<Details>) => void;
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
      addToCart: (product: ProductProps) => {
        set(({ products, details }) => {
          const hasId = products.find(
            (CartProduct) => CartProduct.id === product.id
          );

          if (hasId) {
            toast("Product already in the cart");
          }

          return !hasId
            ? {
                products: [...products, { ...product, ...details }],
              }
            : {};
        });
      },
      setDetail: (id, newDetails) =>
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
