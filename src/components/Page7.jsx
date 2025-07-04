import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import toast, { Toaster } from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";
import { useWishlist } from "./WishlistContext";
import { useCart } from "./CartContext";

import choco1 from "../assets/react.svg";
import choco2 from "../assets/react.svg";
import choco3 from "../assets/react.svg";
import choco4 from "../assets/react.svg";

// ✅ Step 1: Default (dummy) items shown before backend loads
const defaultItems = [
  {
    title: "Necklace",
    price: 849,
    originalPrice: 999,
    discount: "15% Off",
    slug: "necklace",
    image: choco1,
    delivery: "Tomorrow",
    category: "Jewellery",
    shop: "Necklace",
    amount: 849,
  },
  {
    title: "Bangles",
    price: 799,
    slug: "bangles",
    image: choco2,
    delivery: "Tomorrow",
    category: "Jewellery",
    shop: "Necklace",
    amount: 799,
  },
  {
    title: "Diamond Ring",
    price: 2649,
    originalPrice: 2899,
    discount: "9% Off",
    slug: "diamond-ring",
    image: choco3,
    delivery: "Tomorrow",
    category: "Jewellery",
    shop: "Necklace",
    amount: 2649,
  },
  {
    title: "Gold Earrings",
    price: 849,
    originalPrice: 949,
    discount: "10% Off",
    slug: "gold-earrings",
    image: choco4,
    delivery: "Tomorrow",
    category: "Jewellery",
    shop: "Necklace",
    amount: 849,
  },
];

export default function Page7() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const { addProducts } = useProduct();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const shimmerArray = new Array(4).fill(null);

  // ✅ Step 2: useEffect to show dummy data then fetch backend
  useEffect(() => {
    setItems(defaultItems);
    setLoading(false);
    addProducts(defaultItems);

    fetch("https://your-backend.com/api/products?category=Jewellery&shop=Necklace")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((fetched) => {
        const withAmount = fetched.map((item) => ({
          ...item,
          amount: item.amount ?? item.price,
        }));
        setItems(withAmount);
        addProducts(withAmount);
      })
      .catch((err) => {
        console.error("Failed to fetch backend data:", err.message);
        // keep defaultItems visible
      });
  }, []);

  useEffect(() => {
    const scrollToSelf = () => {
      const el = document.getElementById("page7-section");
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset =
          rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    };
    window.addEventListener("scroll-to-page7", scrollToSelf);
    return () => window.removeEventListener("scroll-to-page7", scrollToSelf);
  }, []);

  const handleWishlistToggle = (e, item) => {
    e.preventDefault();
    toggleWishlist(item);
    toast.success(
      `${isInWishlist(item.slug) ? "Removed from" : "Added to"} Wishlist: ${item.title}`
    );
  };

  return (
    <div
      id="page7-section"
      className="bg-purple-50 py-12 mb-[-6rem] px-4 sm:px-6 lg:px-8 min-h-auto"
    >
      <Toaster position="top-right" />
      <Cards
        title="Jewellery"
        data={loading ? shimmerArray : items}
        selectedItem={selected}
        onSelect={setSelected}
        viewMoreLink="/store?category=Jewellery&shop=Necklace"
        itemKey={(item, i) => `page7-${item?.slug || `shimmer-${i}`}`}
        renderItem={(item, _, isActive) =>
          !item ? (
            <div className="animate-pulse p-3 space-y-3 h-[300px] flex flex-col justify-between">
              <div className="w-full h-44 bg-gray-300 rounded-lg" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          ) : (
            <Link
              to={`/product/${item.slug}`}
              className="relative group block p-3 h-[300px] flex flex-col justify-between bg-white rounded-lg shadow hover:shadow-lg transition"
              onClick={() => setSelected(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-44 object-cover rounded-lg"
              />
              <button
                className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow group-hover:scale-105 transition"
                onClick={(e) => handleWishlistToggle(e, item)}
              >
                <FaHeart
                  className={`text-sm transition ${
                    isInWishlist(item.slug)
                      ? "text-red-500"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                />
              </button>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-green-700 font-semibold text-base">
                    ₹ {item.price}
                  </span>
                  {item.originalPrice && (
                    <>
                      <span className="line-through text-sm text-gray-500">
                        ₹ {item.originalPrice}
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        {item.discount}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Delivery:{" "}
                  <span className="text-green-600 font-medium">
                    {item.delivery}
                  </span>
                </p>
              </div>
            </Link>
          )
        }
      />
    </div>
  );
}
