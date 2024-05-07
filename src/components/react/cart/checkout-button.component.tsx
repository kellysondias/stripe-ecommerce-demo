import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "./store/cart-store";
import { fetchFromAPI } from "../../../utils/fetchFromApi";

const API = "http://localhost:3000";

export const CheckoutButton = () => {
  const { products } = useCartStore();

  const body = JSON.stringify(products);

  if (!products) {
    console.log("Empty cart");
    return;
  }
  console.log("🚀 ~ CheckoutButton ~ products:", products);

  const handleCheckout = async () => {
    const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLISHABLE_KEY!);

    const stripe = await stripePromise;
    const response = await fetchFromAPI("/api/v1/checkout", body as any);
    const { session } = await response.json();
    console.log("🚀 ~ handleCheckout ~ session:", session);
    await stripe?.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div onClick={handleCheckout} className="mt-6 cursor-pointer">
      <div className="flex items-center justify-center  border px-6 py-3 text-base font-medium text-white shadow-sm">
        Checkout
      </div>
    </div>
  );
};
