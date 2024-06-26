import type { ProductProps } from "../../../pages/index.astro";
import { useCartStore } from "./store/cart-store";

interface Props {
  children: string;
  product: ProductProps;
  className?: string;
}

export const CartButton: React.FC<Props> = ({
  children,
  product,
  className,
}) => {
  const { addToCart, setOpen, products } = useCartStore();

  const handleCartState = () => {
    addToCart(product);
    setOpen(true);
  };

  return (
    <button onClick={handleCartState} className={`${className}`}>
      {children}
    </button>
  );
};
