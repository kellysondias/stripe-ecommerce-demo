import { loadStripe } from "@stripe/stripe-js";
import { useCartStore } from "../store/cart-store";
import { postToAPI } from "../../../../utils/postToApi";

export const CheckoutButton = () => {
  const { products } = useCartStore();

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
    const stripePromise = loadStripe(
      import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

    const stripe = await stripePromise;

    const { prices } = await postToAPI("create-price", body);
    console.log("🚀 ~ handleCheckout ~ body:", body)

    const line_items = prices.map((price: string, index: number) => ({
      price,
      quantity: body[index].quantity,
    }));

    const {
      id: sessionId
    } = await postToAPI("checkout", line_items);

    await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <div onClick={handleCheckout} className="mt-6 cursor-pointer">
      <div className="flex items-center justify-center  border px-6 py-3 text-base font-medium text-white shadow-sm">
        Checkout
      </div>
    </div>
  );
};
