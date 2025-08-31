import React, { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LocationModal() {
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [address, setAddress] = useState("Noida, Sector 62, UP");
  const [isMobile, setIsMobile] = useState(false);
  const [showBlock, setShowBlock] = useState(false);

  // Form states
  const [house, setHouse] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");

  const timerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullAddress = `${house}, ${area}, ${city}, ${district}, ${state} - ${pin}`;
    setAddress(fullAddress);
    setShowModal(false);
  };

  // Long press logic
  const handlePressStart = () => {
    timerRef.current = setTimeout(() => {
      setShowBlock(true);
    }, 2000); // 2 sec
  };

  const handlePressEnd = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <div className="relative flex items-center gap-3">
      {/* Location Icon */}
      <div
        className="relative cursor-pointer"
        onClick={() => setShowModal(true)}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
      >
        <MapPin className="w-6 h-6 text-purple-600 hover:scale-110 transition-transform" />

        {/* Address tooltip on hover (desktop only) */}
        <AnimatePresence>
          {!isMobile && hovered && (
            <motion.div
              className="absolute -left-10 top-1/3 border-none translate-y-1/3
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

        {/* Long press block (mobile only) */}
        <AnimatePresence>
          {isMobile && showBlock && (
            <motion.div
              className="absolute left-0 top-10 bg-purple-600 text-white p-3 rounded-xl shadow-lg z-30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              📍 Your Address <br />
              <span className="font-semibold">{address}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4 rounded-2xl"
              onClick={() => setShowModal(false)} // close on backdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Modal Box */}
              <motion.div
                onClick={(e) => e.stopPropagation()} // prevent closing on modal click
                className={`bg-white shadow-lg relative ${
                  isMobile
                    ? "w-full max-h-[90%] h-auto absolute bottom-0 rounded-t-2xl p-6"
                    : "p-6 w-[95%] max-w-lg rounded-xl"
                }`}
                initial={isMobile ? { y: "100%" } : { scale: 0.8, opacity: 0, y: -50 }}
                animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1, y: 0 }}
                exit={isMobile ? { y: "100%" } : { scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Close Button */}
                <button
                  type="button" // ✅ prevents form submit
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
                >
                  ✕
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-5 text-gray-800">
                  Add New Address
                </h2>

                {/* Address Form */}
                <form
                  onSubmit={handleSubmit}
                  className={`grid gap-4 ${
                    isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
                  }`}
                >
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
