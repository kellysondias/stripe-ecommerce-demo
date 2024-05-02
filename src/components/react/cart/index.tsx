import React from "react";
import { useCartStore } from "./store/cart-store";
import { CartUI } from "./cart-ui.component";

export const Cart: React.FC = () => {
  const { products, removeFromCart, open, setOpen } = useCartStore();

  return (
    <CartUI
      products={products}
      removeFromCart={removeFromCart}
      open={open}
      setOpen={setOpen}
    />
  );
};
