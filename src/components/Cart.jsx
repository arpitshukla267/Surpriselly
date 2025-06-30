import React from "react";
import { useCart } from "../components/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();

  const incrementQty = (slug) => {
    const item = cart.find((i) => i.slug === slug);
    if (item) updateQty(slug, (item.qty || 1) + 1);
  };

  const decrementQty = (slug) => {
    const item = cart.find((i) => i.slug === slug);
    if (item) updateQty(slug, Math.max(1, (item.qty || 1) - 1));
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.amount || 0) * (item.qty || 1),
    0
  );

  return (
    <div className="max-w-6xl mx-auto py-10 mt-[5rem] md:mt-[13rem] px-4">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left - Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <div
                key={item.slug || index}
                className="p-4 border rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center"
              >
                <img
                  src={item.img || item.image || "/placeholder.png"}
                  alt={item.title}
                  className="h-32 w-32 object-cover rounded"
                />
                <div className="flex-1 w-full">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-purple-700 font-bold">
                    ₹{item.amount || 0} x {item.qty || 1} = ₹
                    {(item.amount || 0) * (item.qty || 1)}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => decrementQty(item.slug)}
                      className="px-3 py-1 bg-gray-200 rounded text-lg"
                    >
                      −
                    </button>
                    <span className="px-3 text-lg">{item.qty || 1}</span>
                    <button
                      onClick={() => incrementQty(item.slug)}
                      className="px-3 py-1 bg-gray-200 rounded text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.slug)}
                    className="mt-2 text-sm text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Total Summary */}
          <div className="border rounded-lg shadow-md p-6 h-fit sticky top-20 bg-white">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Total Items:</span>
              <span>{cart.reduce((sum, i) => sum + (i.qty || 1), 0)}</span>
            </div>
            <div className="flex justify-between font-semibold text-purple-800 text-lg">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
