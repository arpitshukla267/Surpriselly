import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import {
  FaShoppingCart,
  FaBell,
  FaHeart,
  FaSearch,
  FaMotorcycle,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";

const categoriesTop = ["Combos", "Hampers", "Quick Gifts", "Local shops"];
const categoriesBottom = [
  "Personalized Gifts",
  "Electronics & Gadgets",
  "Fashion & Accessories",
  "Home & Decor",
  "Food & Beverages",
  "Toys & Games",
  "Wellness & Self‑Care",
];

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileMenuOpen]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/store?search=${encodeURIComponent(searchTerm.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setMobileMenuOpen(false),
    onSwipedRight: () => setMobileMenuOpen(true),
  });

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white text-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between md:justify-around">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Logo" className="h-14" />
        </a>

        <div className="hidden md:flex ml-[6rem] flex-1 mx-6">
          <div className="relative w-full max-w-md group">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-12 pr-12 py-2.5 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            />
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-2.5 hover:bg-purple-200 text-purple-600 p-1.5 rounded-full"
              title="Search"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/store" className="text-purple-700 font-semibold hover:underline">
            Same Day Delivery <FaMotorcycle className="inline ml-1" />
          </NavLink>
          <div className="flex items-center gap-2 font-medium text-purple-700">
            <FaMapMarkerAlt className="text-red-600" />
            <span>Jhansi</span>
          </div>
          <NavLink to="/cart" className="relative">
            <FaShoppingCart className="text-2xl text-purple-700 hover:text-green-600" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white rounded-full h-5 w-5 grid place-content-center">
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            )}
          </NavLink>
          <NavLink to="/wishlist" className="relative">
            <FaHeart className="text-2xl text-purple-700 hover:text-red-600" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white rounded-full h-5 w-5 grid place-content-center">
                {wishlist.length}
              </span>
            )}
          </NavLink>
          <button className="relative">
            <FaBell className="text-2xl text-purple-700 hover:scale-110 transition" />
            <span className="absolute -top-1 -right-2 h-4 w-4 text-[10px] bg-red-600 text-white rounded-full grid place-content-center">
              0
            </span>
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-purple-700 text-2xl"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        {...swipeHandlers}
        className={`md:hidden transform transition-all duration-500 ease-in-out origin-top bg-white shadow-lg overflow-hidden ${
          mobileMenuOpen ? "max-h-[1000px] opacity-100 scale-100 py-4 px-4" : "max-h-0 opacity-0 scale-95 py-0 px-4"
        }`}
      >
        <div className="space-y-4 transition-opacity duration-500">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-10 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-2.5 text-purple-600 hover:text-purple-800"
            >
              <FaSearch />
            </button>
          </div>

          <NavLink to="/store" onClick={() => setMobileMenuOpen(false)} className="block text-purple-700 font-medium">
            <FaMotorcycle className="inline mr-2" /> Same Day Delivery
          </NavLink>

          <NavLink to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-purple-700 font-medium">
            <FaHeart className="text-lg" /> Wishlist
            {wishlist.length > 0 && (
              <span className="ml-1 text-xs bg-red-600 text-white rounded-full h-4 w-4 grid place-content-center">
                {wishlist.length}
              </span>
            )}
          </NavLink>

          <NavLink to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-purple-700 font-medium">
            <FaShoppingCart className="text-lg" /> Cart
            {cart.length > 0 && (
              <span className="ml-1 text-xs bg-red-600 text-white rounded-full h-4 w-4 grid place-content-center">
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            )}
          </NavLink>

          {categoriesTop.map((cat, i) => (
            <div key={i} className="text-sm font-semibold text-gray-700">
              {cat}
            </div>
          ))}

          {/* Collapsible categories */}
          <div>
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center gap-2 text-sm text-gray-700 font-medium mt-2"
            >
              More Categories
              <FaChevronDown className={`transform transition-transform ${showCategories ? "rotate-180" : "rotate-0"}`} />
            </button>

            <div
              className={`transition-all duration-300 overflow-hidden ${
                showCategories ? "max-h-[500px] mt-2 space-y-1" : "max-h-0"
              }`}
            >
              {categoriesBottom.map((cat, i) => (
                <div key={i} className="text-sm text-gray-600">
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top categories strip */}
      <div className="bg-[#7669C1] text-white p-2 hidden md:flex gap-7 font-semibold text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex gap-6">
          {categoriesTop.map((cat, i) => (
            <div key={i} className="cursor-pointer hover:underline flex items-center gap-1">
              {cat === "Combos" && (
                <span className="bg-red-500 text-white px-2 py-0.5 hover:no-underline text-xs rounded-full">
                  NEW
                </span>
              )}
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom categories strip */}
      <div className="bg-white text-black p-2 font-medium text-sm border-b hidden md:flex">
        <div className="max-w-7xl mx-auto px-6 py-2 flex flex-wrap gap-6">
          {categoriesBottom.map((cat, i) => (
            <div
              key={i}
              className="cursor-pointer hover:text-purple-700 whitespace-nowrap"
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Floating cart on mobile */}
      <NavLink
        to="/cart"
        className="md:hidden fixed bottom-6 right-4 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all"
      >
        <FaShoppingCart className="text-xl" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white rounded-full h-4 w-4 grid place-content-center">
            {cart.reduce((sum, item) => sum + item.qty, 0)}
          </span>
        )}
      </NavLink>
    </header>
  );
}
