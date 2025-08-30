import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; 
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
  const navigate = useNavigate();

  // ✅ Handle search filter (for suggestions only)
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

  // ✅ Handle scroll collapse/expand
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY + 5) {
        setIsVisible(false);
      } else if (window.scrollY < lastScrollY - 5) {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ✅ Prevent page scroll when dropdown open
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

  // 🔹 Handle search button click
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`fixed top-10 lg:left-1/5 left-1/2 transform -translate-x-1/2 lg:translate-0 w-full lg:w-[40vw] px-4 pt-8 pb-3 z-10
        transition-all duration-500 lg:duration-300 ease-in-out 
        ${isVisible ? "translate-y-0 lg:-top-2" : "-translate-y-20 lg:-top-5"}`}
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="relative w-full pl-6 pr-12 py-2.5 shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-100"
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} // 🔹 Enter to search
        />

        <button
          onClick={handleSearch}
          className="absolute right-3 top-3 hover:bg-purple-200 text-purple-600 p-1 rounded-full"
          title="Search"
        >
          <FaSearch />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 px-4 py-2 right-0 mt-1 rounded-xl shadow-lg md:shadow-none max-h-60 overflow-y-auto z-50 bg-white md:bg-transparent">
          {suggestions.map((item, index) => (
            <li
              key={item.slug || item.title}
              className={`px-4 py-2 hover:bg-purple-500 bg-purple-100 cursor-pointer ${
                index !== suggestions.length - 1 ? "border-b border-gray-400" : ""
              }`}
              onClick={() => {
                setSearchTerm(item.name || item.title);
                setShowSuggestions(false);
                navigate(`/product/${item.slug}`);
              }}
            >
              {item.name || item.title} – ₹{item.price || item.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
