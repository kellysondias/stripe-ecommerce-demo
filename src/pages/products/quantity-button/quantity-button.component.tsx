import { useEffect, useState } from "react";
import { useCartStore } from "../../../components/react/cart/store/cart-store";
import type { ProductProps } from "../../index.astro";

interface Props {
  id: string;
  allProducts: ProductProps[];
}

export const QuantityButton: React.FC<Props> = ({ id }) => {
  const { setQuantity, quantity } = useCartStore();
  const [count, setCount] = useState<number>(1);

  useEffect(() => setQuantity(id, count), [count]);
  console.log("🚀 ~ quantity:", quantity);

  return (
    <div className="mt-5 flex justify-center items-center text-center my-0 mx-auto text-xl select-none">
      <button className="bold self-center" onClick={() => setCount(count + 1)}>
        <i>+</i>
      </button>
      <span className="bg-gray-900 px-2 mx-5 self-center">{count}</span>
      <button
        className="bold self-center"
        onClick={() => setCount(Math.max(count - 1, 1))}
      >
        <i className={`${count <= 1 ? "text-white/30 cursor-default" : ""}`}>
          -
        </i>
      </button>
    </div>
  );
};
