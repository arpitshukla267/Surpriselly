import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Filter, X, SortAsc } from "lucide-react";

export default function Filters({
  subcategories = [],
  selectedSubcategory,
  setSelectedSubcategory,
  searchTerm,
  setSearchTerm,
  maxPrice,
  setMaxPrice,
  sortRange,
  setSortRange,
}) {
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [showSortSidebar, setShowSortSidebar] = useState(false);

  // ✅ Prevent page scroll when filter or sort sidebar is active
  useEffect(() => {
    if (showFilterSidebar || showSortSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilterSidebar, showSortSidebar]);

  // Handle subcategory click
  const handleSubcategoryClick = (sub) => {
    setSelectedSubcategory(sub);
    setShowFilterSidebar(false);
  };

  return (
    <div className="lg:hidden">
      {/* Bottom Buttons */}
      <div className="md:hidden flex justify-end px-4">
        {/* Sort Button */}
        <button
          onClick={() => setShowSortSidebar(true)}
          className="fixed z-99 bottom-0 left-0 gap-2 text-lg text-white flex items-center justify-center border-r-2 border-white backdrop-blur-2xl bg-purple-600/60 py-2 px-4 w-[50%] font-bold hover:bg-purple-700 transition"
        >
          <SortAsc size={22} /> Sort
        </button>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilterSidebar(true)}
          className="fixed z-99 bottom-0 right-0 text-lg text-white flex items-center justify-center gap-2 backdrop-blur-2xl bg-purple-600/60 py-2 px-4 w-[50%] font-bold hover:bg-purple-700 transition"
        >
          <Filter size={22} /> Filter
        </button>
      </div>

      {/* FILTER SIDEBAR (slides from left) */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full w-72 z-990 bg-white shadow-lg transform transition-transform duration-300 md:hidden",
          showFilterSidebar ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-700">Filters</h3>
          <button onClick={() => setShowFilterSidebar(false)}>
            <X size={24} className="text-gray-700 hover:text-red-500 transition" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Subcategories */}
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

      {/* SORT SIDEBAR (slides from bottom) */}
      <div
        className={clsx(
          "fixed left-0 bottom-0 w-full bg-white shadow-2xl z-999 transform transition-transform duration-300 md:hidden",
          showSortSidebar ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-700">Sort by Price</h3>
          <button onClick={() => setShowSortSidebar(false)}>
            <X size={24} className="text-gray-700 hover:text-red-500 transition" />
          </button>
        </div>

        {/* Price Ranges */}
        <div className="p-6 flex flex-col gap-3">
          {[
            { label: "All", range: [0, Infinity] },
            { label: "₹0 - ₹1000", range: [0, 1000] },
            { label: "₹1000 - ₹5000", range: [1000, 5000] },
            { label: "₹5000 - ₹10000", range: [5000, 10000] },
            { label: "₹10000+", range: [10000, Infinity] },
          ].map((option) => (
            <button
              key={option.label}
              onClick={() => {
                setSortRange(option.range);
                setShowSortSidebar(false);
              }}
              className={clsx(
                "w-full text-left px-4 py-2 rounded-md border font-medium transition",
                sortRange &&
                  sortRange[0] === option.range[0] &&
                  sortRange[1] === option.range[1]
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-700 hover:bg-purple-100"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
