import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LocationModal() {
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [address, setAddress] = useState("Noida, Sector 62, UP");

  // Form states
  const [house, setHouse] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // build full address
    const fullAddress = `${house}, ${area}, ${city}, ${district}, ${state} - ${pin}`;
    setAddress(fullAddress);
    setShowModal(false);
  };

  return (
    <div className="relative flex items-center gap-3">
      {/* Location Icon */}
      <div
        className="relative cursor-pointer"
        onClick={() => setShowModal(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <MapPin className="w-6 h-6 text-purple-600 hover:scale-110 transition-transform" />

        {/* Address tooltip on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute -left-10 top-1/3 translate-y-1/3 border-none
                         bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                         shadow-xl px-5 py-4 rounded-2xl text-white z-20 
                         min-w-[220px] border border-white/20"
              initial={{ opacity: 0, x: -15, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -15, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h4 className="font-semibold text-md mb-2 border-b border-white/40 pb-1">
                📍 Your Address
              </h4>
              <p className="text-sm leading-relaxed">{address}</p>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Modal Box */}
              <motion.div
                className="bg-white p-6 rounded-xl shadow-lg w-[95%] max-w-lg relative"
                initial={{ scale: 0.8, opacity: 0, y: -50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition hover:cursor-pointer"
                >
                  ✕
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-5 text-gray-800">
                  Add New Address
                </h2>

                {/* Address Form */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* House / Flat / Building */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      House / Flat / Building
                    </label>
                    <input
                      type="text"
                      value={house}
                      onChange={(e) => setHouse(e.target.value)}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    />
                  </div>

                  {/* Area / Street */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Area / Street
                    </label>
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    />
                  </div>

                  {/* District */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      District
                    </label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    />
                  </div>

                  {/* Pin Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Pin Code
                    </label>
                    <input
                      type="number"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    />
                  </div>

                  {/* Save Button */}
                  <div className="col-span-2 flex justify-end mt-4">
                    <button
                      type="submit"
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700 transition"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
