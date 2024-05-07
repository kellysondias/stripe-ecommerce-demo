import { loadStripe } from "@stripe/stripe-js";
import { useCartStore, type CartProduct } from "./store/cart-store";
import { fetchFromAPI } from "../../../utils/fetchFromApi";

export const CheckoutButton = () => {
  const { products } = useCartStore();

  const body = products.map(({ name, image: { url }, description, price }) => ({
    name,
    image: url,
    description,
    price,
  }));

  const handleCheckout = async () => {
    const stripePromise = loadStripe(
      import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

    const stripe = await stripePromise;

    const { price } = await fetchFromAPI("/api/v1/create-price", body as any);

    const {
      session: { id },
    } = await fetchFromAPI("/api/v1/checkout", price as any);
    await stripe?.redirectToCheckout({ sessionId: id });
  };

  handleCheckout();

  return (
    <div onClick={handleCheckout} className="mt-6 cursor-pointer">
      <div className="flex items-center justify-center  border px-6 py-3 text-base font-medium text-white shadow-sm">
        Checkout
      </div>
    </div>
  );
};
