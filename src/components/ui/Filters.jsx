import React, { useState } from "react";
import clsx from "clsx";
import { Menu } from "lucide-react"; // Hamburger icon

export default function Filters({
  subcategories = [],
  selectedSubcategory,
  setSelectedSubcategory,
  searchTerm,
  setSearchTerm,
  maxPrice,
  setMaxPrice,
}) {
  const [showSidebar, setShowSidebar] = useState(false);

  // Handle closing sidebar when a filter changes
  const handleSubcategoryClick = (sub) => {
    setSelectedSubcategory(sub);
    setShowSidebar(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSidebar(false);
  };

  return (
    <div className="lg:hidden">
      {/* Mobile: Hamburger button */}
      <div className="md:hidden flex justify-end mb-4 px-4">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="absolute right-5 text-purple-600 font-bold rounded-full hover:bg-purple-700 transition"
        >
          <Menu size={30} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden",
          showSidebar ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex flex-col gap-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Filters</h3>

          {/* Subcategories list */}

          {/* Search */}
          <input
            type="text"
            className="w-full border-gray-300 shadow-md py-2 px-4 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
            />

          {/* Price Range */}
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Max Price: <span className="text-purple-600 font-bold">₹{maxPrice}</span>
            </label>
            <input
              type="range"
              min="0"
              max="20000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="
                w-full h-3 rounded-full
                bg-gradient-to-r from-purple-400 via-pink-400 to-red-400
                accent-purple-600
                cursor-pointer
                hover:opacity-90
                focus:outline-none focus:ring-2 focus:ring-purple-500
                transition-all duration-300
              "
              />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹0</span>
              <span>₹20,000</span>
            </div>
          </div>
              {subcategories.length > 0 && (
                <ul className="flex flex-col gap-2">
                  <li>
                    <button
                      onClick={() => handleSubcategoryClick(null)}
                      className={clsx(
                        "w-full text-left px-3 py-2 rounded-md border font-semibold",
                        selectedSubcategory === null
                          ? "bg-purple-500 text-white"
                          : "bg-white text-purple-500 hover:bg-purple-50"
                      )}
                    >
                      All
                    </button>
                  </li>
                  {subcategories.map((sub) => (
                    <li key={sub}>
                      <button
                        onClick={() => handleSubcategoryClick(sub)}
                        className={clsx(
                          "w-full text-left px-3 py-2 rounded-md border",
                          selectedSubcategory === sub
                            ? "bg-purple-600 text-white"
                            : "bg-white text-purple-700 hover:bg-purple-100"
                        )}
                      >
                        {sub}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
        </div>
      </div>
    </div>
  );
}
