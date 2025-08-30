import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PriceDetails({ cart = [], total = 0, handleCheckout }) {
  const [showDetails, setShowDetails] = useState(false);

  // ✅ Prevent background scroll when modal is open
  useEffect(() => {
    if (showDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showDetails]);

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-white rounded shadow md:p-5 p-3 h-fit lg:sticky lg:top-36">
      <h2 className="hidden md:block text-lg font-semibold text-gray-700 mb-3">
        PRICE DETAILS
      </h2>
      <hr className="mb-3 hidden md:block" />

      {/* md+ screen details */}
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

      {/* Bottom Section */}
      <div className="flex flex-row md:flex-col justify-between items-center">
        <div className="w-full flex md:flex-row flex-col justify-between text-gray-800 md:font-bold font-semibold mb-4">
          <span className="md:text-md text-sm">Total Amount</span>
          <div className="flex flex-row items-center">
            <span className="text-xl font-bold">₹{total.toFixed(2)}</span>
            <button
              className="md:hidden ml-2 text-gray-500"
              onClick={() => setShowDetails(true)}
            >
              <Info size={18} />
            </button>
          </div>
        </div>

        <button
          className="md:w-full md:py-3 px-4 py-3 bg-orange-500 text-white font-semibold rounded text-nowrap hover:bg-orange-600 transition"
          onClick={handleCheckout}
        >
          PLACE ORDER
        </button>
      </div>

      {/* Animated Popup Modal (only mobile) */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 md:hidden z-50 flex justify-center items-end"
            onClick={() => setShowDetails(false)} // close on overlay click
          >
            {/* Bottom sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) setShowDetails(false); // close if pulled down
              }}
              className="bg-white w-full rounded-t-xl p-5 max-h-[70vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // prevent overlay click when tapping inside
            >
              {/* Drag handle */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-700">
                  Price Details
                </h2>
                <button
                  className="text-gray-500"
                  onClick={() => setShowDetails(false)}
                >
                  ✕
                </button>
              </div>

              <div className="flex justify-between text-gray-600 text-sm mb-2">
                <span>Price ({cart.length} items)</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm mb-2">
                <span>Discount</span>
                <span className="text-green-600">− ₹0</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm mb-2">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>

              <hr className="my-3" />
              <div className="flex justify-between text-gray-800 font-bold mb-2">
                <span>Total Amount</span>
                <span className="text-xl">₹{total.toFixed(2)}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
