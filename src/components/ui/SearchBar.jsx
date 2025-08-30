import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; 
import { FaSearch } from "react-icons/fa";
import { useProduct } from "../ProductContext";

export default function SearchBar() {
  const { allProducts } = useProduct(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const wrapperRef = useRef(null);

  // ✅ Handle search filter
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = allProducts.filter((item) =>
      (item.name || item.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5));
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

  // ✅ Handle scroll to collapse/expand search bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY + 5) {
        setIsVisible(false); // scrolling down → collapse
      } else if (window.scrollY < lastScrollY - 5) {
        setIsVisible(true); // scrolling up → expand
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ✅ Prevent page scroll when search bar is active
  useEffect(() => {
    if (showSuggestions) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSuggestions]);

  return (
    <div
      ref={wrapperRef}
      className={`fixed top-10 lg:-top-2 lg:left-auto left-1/2 transform -translate-x-1/2 lg:translate-0 w-full px-4 pt-8 pb-3 max-w-md z-10
        transition-all duration-500 ease-in-out
        ${isVisible ? "translate-y-0 " : "-translate-y-20"}`}
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="relative w-full pl-6 pr-12 py-2.5 shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          onFocus={() => setShowSuggestions(true)}
        />

        <button
          className="absolute right-3 top-3 hover:bg-purple-200 text-purple-600 p-1 rounded-full"
          title="Search"
        >
          <FaSearch />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 px-4 py-2 right-0 mt-1 rounded-xl shadow-lg max-h-60 overflow-y-auto z-50 bg-white">
          {suggestions.map((item, index) => (
            <li
              key={item.slug || item.title}
              className={`px-4 py-2 hover:bg-purple-500 bg-purple-100 cursor-pointer ${
                index !== suggestions.length - 1 ? "border-b border-gray-400" : ""
              }`}
              onClick={() => {
                setSearchTerm(item.name || item.title);
                setShowSuggestions(false);
              }}
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
