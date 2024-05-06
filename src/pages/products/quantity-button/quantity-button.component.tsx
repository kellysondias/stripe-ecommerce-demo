import { useEffect, useState } from "react";
import { useCartStore } from "../../../components/react/cart/store/cart-store";
import type { ProductProps } from "../../index.astro";

interface Props {
  id: string;
  allProducts: ProductProps[];
}

export const QuantityButton: React.FC<Props> = ({ id }) => {
  const { setDetails, details } = useCartStore();
  const [count, setCount] = useState(1);

  useEffect(() => setDetails(id, { quantity: count }), [count]);
  console.log("🚀 ~ details:", details);

  return (
    <div className="mt-5 flex justify-center items-center text-center mx-auto text-xl select-none">
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
