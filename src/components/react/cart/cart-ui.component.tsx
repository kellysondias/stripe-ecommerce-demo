import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "./store/cart-store";
import { formatPrice } from "../../../utils/formatPrice";

export const CartUI: React.FC = () => {
  const { products, open, setOpen, removeFromCart } = useCartStore();
  let total = 0;

  return (
    <aside>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/25 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden text-white">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-gray-900 shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div
                          className={`mt-8 ${
                            products.length === 0
                              ? "flex flex-col items-center"
                              : ""
                          }`}
                        >
                          <div className="flow-root">
                            {products.length === 0 ? (
                              <span className="text-white">
                                You have no items in the cart.
                              </span>
                            ) : (
                              <>
                                <ul
                                  role="list"
                                  className="-my-6 divide-y divide-gray-200"
                                >
                                  {products.map((product) => {
                                    total += Number(product.price);
                                    return (
                                      <li
                                        key={product.id}
                                        className="flex py-6"
                                      >
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                          <img
                                            loading="eager"
                                            src={product.image.url}
                                            alt={product.image.alt ?? "Product"}
                                            className="h-full w-full object-cover object-center"
                                          />
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col">
                                          <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                              <h3>{product.name}</h3>
                                              <p className="ml-4">
                                                {product.price}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-white">
                                              Quantity: {product.quantity}
                                            </p>
                                            <div className="flex">
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  removeFromCart(product.id)
                                                }
                                                className="font-medium text-white"
                                              >
                                                Remove
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                                <span>Total: {formatPrice(`${total}`)}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>$262.00</p>
                        </div>
                        <p className="mt-0.5 text-sm text-white">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="flex items-center justify-center  border px-6 py-3 text-base font-medium text-white shadow-sm "
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-white">
                          <p>
                            or{" "}
                            <a
                              href="/"
                              className="font-medium text-white"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </aside>
  );
};
