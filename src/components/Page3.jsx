import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";

import choco1 from "../assets/react.svg";
import choco2 from "../assets/react.svg";
import choco3 from "../assets/react.svg";
import choco4 from "../assets/react.svg";

const defaultItems = [
  {
    title: "Neckband",
    price: 849,
    originalPrice: 999,
    discount: "15% Off",
    slug: "neckband",
    image: "https://i.pinimg.com/736x/02/dc/a6/02dca654322b41109f1bfff157c116a1.jpg",
    delivery: "Tomorrow",
    category: "Electronics & Gadgets",
    shop: "Accessories",
    amount: 849,
  },
  {
    title: "Earbuds",
    price: 799,
    slug: "earbuds",
    image: "https://i.pinimg.com/1200x/3b/55/9f/3b559fafd9cf32a9064e5f1104cdf11d.jpg",
    delivery: "Tomorrow",
    category: "Electronics & Gadgets",
    shop: "Accessories",
    amount: 799,
  },
  {
    title: "Boat Rockerz 450",
    price: 2649,
    originalPrice: 2899,
    discount: "9% Off",
    slug: "boat-rockerz-450",
    image: "https://i.pinimg.com/736x/4f/87/fd/4f87fd21dc5ec4269f539c15cbbc47b1.jpg",
    delivery: "Tomorrow",
    category: "Electronics & Gadgets",
    shop: "Accessories",
    amount: 2649,
  },
  {
    title: "Power Bank",
    price: 849,
    originalPrice: 949,
    discount: "10% Off",
    slug: "power-bank",
    image: "https://i.pinimg.com/736x/fe/50/2f/fe502fcc5cf9e9fd1dd54c6101886e6b.jpg",
    delivery: "Tomorrow",
    category: "Electronics & Gadgets",
    shop: "Accessories",
    amount: 849,
  },
];

export default function Page3() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist-page3")) || [];
  });

  const { addProducts } = useProduct();

useEffect(() => {
  // Step 1: show dummy data immediately
  setItems(defaultItems);
  setLoading(false);
  addProducts(defaultItems);

  // Step 2: fetch backend data
  fetch("https://your-backend.com/api/products?category=Electronics%20%26%20Gadgets")
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
      // Keep defaultItems visible
    });
}, []);


  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem("wishlist-page3");
      setWishlist(stored ? JSON.parse(stored) : []);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const isInWishlist = (slug) => wishlist.some((item) => item.slug === slug);

  const toggleWishlist = (item) => {
    const exists = isInWishlist(item.slug);
    const updated = exists
      ? wishlist.filter((i) => i.slug !== item.slug)
      : [...wishlist, item];

    setWishlist(updated);
    localStorage.setItem("wishlist-page3", JSON.stringify(updated));
    toast.success(`${exists ? "Removed from" : "Added to"} Wishlist: ${item.title}`);
    window.dispatchEvent(new Event("storage"));
  };

  const shimmerArray = new Array(4).fill(null);

  useEffect(() => {
    const scrollToSelf = () => {
      const el = document.getElementById("page3-section");
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset =
          rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    };
    window.addEventListener("scroll-to-page3", scrollToSelf);
    return () => window.removeEventListener("scroll-to-page3", scrollToSelf);
  }, []);

  return (
    <div
      id="page3-section"
      className="bg-purple-50 py-12 lg:mb-[-2rem] mb-[-4rem] lg:px-8 min-h-auto"
    >
      <Cards
        title="Tech & Products"
        data={loading ? shimmerArray : items}
        selectedItem={selected}
        onSelect={setSelected}
        viewMoreLink="/store?category=Electronics%20%26%20Gadgets"
        itemKey={(item, i) => `page3-${item?.slug || `shimmer-${i}`}`}
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
              className="relative group  p-3 h-[300px] flex flex-col bg-white rounded-lg shadow hover:shadow-lg transition"
              onClick={() => setSelected(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-34 md:h-44 object-fit rounded-lg"
              />
              <button
                className="absolute top-4 right-4 bg-white p-1.5 rounded-full shadow group-hover:scale-105 transition"
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(item);
                }}
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
