import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; 
import { FaSearch } from "react-icons/fa";
import { useProduct } from "../ProductContext"; // ✅ import context hook

export default function SearchBar() {
  const { allProducts } = useProduct(); // ✅ get products directly from context
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = allProducts.filter((item) =>
      (item.name || item.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5)); // ✅ limit to 5 results
    setShowSuggestions(true);
  }, [searchTerm, allProducts]);

  // ✅ Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto" ref={wrapperRef}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-6 pr-12 py-2.5 shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
      />

      <button
        className="absolute right-3 top-3 hover:bg-purple-200 text-purple-600 p-1 rounded-full"
        title="Search"
      >
        <FaSearch />
      </button>
      
{showSuggestions && suggestions.length > 0 && (
  <ul className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
    {suggestions.map((item, index) => (
      <li
        key={item.slug || item.title}
        className={`px-4 py-2 hover:bg-purple-100 cursor-pointer ${
          index !== suggestions.length - 1 ? "border-b border-gray-200" : ""
        }`}
        onClick={() => setSearchTerm(item.name || item.title)} // ✅ fill input when clicked
      >
        <Link to={`/product/${item.slug}`}>
          {item.name || item.title} – ₹{item.price || item.amount}
        </Link>
      </li>
    ))}
  </ul>
)}

    </div>
  );
}
