import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import toast, { Toaster } from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

import choco1 from "../assets/react.svg";
import choco2 from "../assets/react.svg";
import choco3 from "../assets/react.svg";
import choco4 from "../assets/react.svg";

// ✅ Default dummy pet items shown first
const defaultItems = [
  {
    title: "Pedigree Dog Food",
    price: 849,
    originalPrice: 999,
    discount: "15% Off",
    slug: "pedigree-dog-food",
    image: "https://i.pinimg.com/736x/6f/20/43/6f20434faecd05c4288b0399b0888ed4.jpg",
    delivery: "Tomorrow",
    category: "Pets Gifts",
    shop: "Pet Gifts",
    amount: 849,
  },
  {
    title: "Whiskas Cat Food",
    price: 799,
    slug: "whiskas-cat-food",
    image: "https://i.pinimg.com/1200x/7a/25/85/7a25858ac50db86bcf6cb069b683e381.jpg",
    delivery: "Tomorrow",
    category: "Pets Gifts",
    shop: "Pet Gifts",
    amount: 799,
  },
  {
    title: "Choco Treats",
    price: 2649,
    originalPrice: 2899,
    discount: "9% Off",
    slug: "choco-treats",
    image: "https://i.pinimg.com/736x/a6/d6/37/a6d637f0257adac6d8a62ea6d1692952.jpg",
    delivery: "Tomorrow",
    category: "Pets Gifts",
    shop: "Pet Gifts",
    amount: 2649,
  },
  {
    title: "Clothes for Pets",
    price: 849,
    originalPrice: 949,
    discount: "10% Off",
    slug: "clothes-for-pets",
    image: "https://i.pinimg.com/736x/4d/5e/3b/4d5e3bfd3a6c8cbc2488dc6bc5be8df3.jpg",
    delivery: "Tomorrow",
    category: "Pets Gifts",
    shop: "Pet Gifts",
    amount: 849,
  },
];

export default function Page8() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const { addProducts } = useProduct();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const shimmerArray = new Array(4).fill(null);

  // ✅ Show dummy → try backend fetch → fallback if fails
  useEffect(() => {
    setItems(defaultItems);
    setLoading(false);
    addProducts(defaultItems);

    fetch("https://your-backend.com/api/products?category=Pets%20Gifts&shop=Pet%20Gifts")
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
      });
  }, []);

  // Scroll-to-view on dispatch
  useEffect(() => {
    const scrollToSelf = () => {
      const el = document.getElementById("page8-section");
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset =
          rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    };
    window.addEventListener("scroll-to-page8", scrollToSelf);
    return () => window.removeEventListener("scroll-to-page8", scrollToSelf);
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
      id="page8-section"
      className="bg-purple-50 py-12 mb-[-6rem] px-0 sm:px-6 lg:px-8 min-h-auto"
    >
      <Toaster position="top-right" />
      <Cards
        title="Pet Gifts"
        data={loading ? shimmerArray : items}
        selectedItem={selected}
        onSelect={setSelected}
        viewMoreLink="/store?category=Pets%20%26%20Gifts&shop=Pet%20Gifts"
        itemKey={(item, i) => `page8-${item?.slug || `shimmer-${i}`}`}
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
              className="relative group p-3 h-[300px] flex flex-col bg-white rounded-lg shadow hover:shadow-lg transition"
              onClick={() => setSelected(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-24 md:h-44 object-fit rounded-lg"
              />
              <button
                className="absolute top-2 right-1 bg-white p-1.5 rounded-full shadow group-hover:scale-105 transition"
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
              
              <div className="mt-4 md:mt-8 flex flex-col justify-between overflow-hidden">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex flex-row items-center gap-2 md:mt-1">
                  <span className="text-green-700 font-semibold text-base">
                    ₹ {item.price}
                  </span>
                  {item.originalPrice && (
                    <>
                      <span className="line-through text-sm text-gray-500">
                        ₹ {item.originalPrice}
                      </span>
                      <span className="hidden md:flex text-xs text-green-600 font-medium">
                        {item.discount}
                      </span>
                    </>
                  )}
                </div>
                <p className="hidden md:flex text-xs text-gray-500 mt-1">
                  Delivery:{" "}
                  <span className="text-green-600 font-medium">{item.delivery}</span>
                </p>
              </div>
            </Link>
          )
        }
      />
    </div>
  );
}
