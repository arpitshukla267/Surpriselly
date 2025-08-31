import React, { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import PriceDetails from "./ui/PriceDetails";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQty,
    incrementQty,
    decrementQty,
    clearCart,
  } = useCart();
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const total = cart.reduce(
    (sum, item) => sum + (item.amount || 0) * (item.qty || 1),
    0
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const handleRemoveAll = () => {
    clearCart();
    setShowModal(false);
  };

  const handleCheckout = () => {
    window.location.href = "https://razorpay.me/@socialoffer";
  };

  return (
    <div className=" min-h-screen">
      <div className="max-w-7xl mx-auto lg:px-4 py-8 mt-[3rem] lg:mt-[5rem]">
       <div className="w-full flex items-center justify-between px-6"> 
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-nowrap ">My Cart</h1>
        <button
          onClick={() => setShowModal(true)}
          className=" text-red-500 text-sm mb-6 hover:cursor-pointer hover:text-red-700"
        >
          Remove All Items
        </button>
       </div>
        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded shadow">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src="/empty-cart.png"
              alt="Empty"
              className="mx-auto h-40"
            />
            <p className="mt-6 text-gray-500 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Cart Items */}
            <div className="lg:col-span-2 space-y-4 px-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.slug || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded shadow p-4 flex gap-4"
                >
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.title}
                    className="lg:h-32 w-32 rounded object-cover "
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-purple-600 font-semibold mt-1">
                      ₹{item.amount}
                    </p>

                    {/* Qty Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decrementQty(item.slug)}
                        className="px-2 py-1 rounded text-lg font-bold hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="font-medium">{item.qty}</span>
                      <button
                        onClick={() => incrementQty(item.slug)}
                        className="px-2 py-1 rounded text-lg font-bold hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.slug)}
                      className="text-red-500 text-sm mt-2 hover:underline"
                    >
                      REMOVE
                    </button>
                  </div>

                  {/* Price Section */}
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">Subtotal</p>
                    <p className="text-gray-900 font-semibold">
                      ₹{item.amount * item.qty}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Price Details */}
            <div className="hidden md:block fixed bottom-0 w-full bg-white rounded shadow md:p-5 p-3 h-fit lg:sticky lg:top-36">
              <h2 className="hidden md:block text-lg font-semibold text-gray-700 mb-3">
                PRICE DETAILS
              </h2>
              <hr className="mb-3 hidden md:block" />

              <div className="hidden md:flex justify-between text-gray-600 text-sm mb-2">
                <span>Price ({cart.length} items)</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <div className="hidden md:flex justify-between text-gray-600 text-sm mb-2">
                <span>Discount</span>
                <span className="text-green-600">− ₹0</span>
              </div>

              <div className="hidden md:flex justify-between text-gray-600 text-sm mb-2">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>

              <hr className="my-3 hidden md:block" />
             <div className="flex flex-row md:flex-col justify-between items-center">
              <div className="w-full flex md:flex-row flex-col justify-between text-gray-800 md:font-bold font-semibold mb-4">
                <span className="md:text-md text-sm">Total Amount</span>
                <span className="text-xl font-bold">₹{total.toFixed(2)}</span>
              </div>

              <button
                className="md:w-full md:py-3 px-4 py-3 bg-orange-500 text-white font-semibold rounded text-nowrap hover:bg-orange-600 transition"
                onClick={handleCheckout}
              >
                PLACE ORDER
              </button>
             </div>
            </div>
          </div>
        )}


        {/* Right: Price Details for mobile screen */}
        <PriceDetails cart={cart} total={total} />  

        {/* Remove All Confirmation Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 lg:px-0 px-10"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm"
              >
                <h3 className="text-lg font-semibold mb-4 text-center">
                  Remove All Items?
                </h3>
                <p className="text-sm text-gray-600 text-center mb-6">
                  Are you sure you want to clear your cart?
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={handleRemoveAll}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    Yes, Remove All
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
