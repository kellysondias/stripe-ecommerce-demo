import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "../store/cart-store";
import { postToAPI } from "../../../../utils/postToApi";
import { useState } from "react";
import { LoadingIcon } from "./loading-icon.component";
import { toast } from "sonner";

export const CheckoutButton = () => {
  const { products } = useCartStore();
  const [loading, setLoading] = useState(false);

  const body = products.map(
    ({ name, image: { url }, description, price, quantity }) => {
      return {
        name,
        image: url,
        description,
        price,
        quantity,
      };
    }
  );

  const handleCheckout = async () => {
    setLoading(true);

    if (body.length === 0) {
      toast("Your cart is empty", { className: "bg-red-700 border-none z-20" });
      setLoading(false);
      return;
    }

    const stripePromise = loadStripe(
      import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

    const stripe = await stripePromise;

    const { prices } = await postToAPI("create-price", body);

    const line_items = prices.map((price: string, index: number) => ({
      price,
      quantity: body[index].quantity,
    }));

    const { id: sessionId } = await postToAPI("checkout", line_items);

    await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <div onClick={handleCheckout} className="mt-6 cursor-pointer">
      <div className="flex items-center justify-center border px-6 py-3 text-base font-medium text-white shadow-sm">
        {!loading ? "Checkout" : <LoadingIcon />}
      </div>
    </div>
  );
};
