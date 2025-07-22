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
    title: "Dark Chocolate Bar Set Of 2",
    price: 849,
    originalPrice: 999,
    discount: "15% Off",
    slug: "dark-chocolate-bar-set-2",
    image: choco1,
    category: "Combos & Baskets",
    shop: "Combos",
    delivery: "Tomorrow",
    amount: 849,
  },
  {
    title: "Sweeter Festive Dark Chocolate Fruit Mix Box",
    price: 799,
    slug: "festive-choco-mix-box",
    image: choco2,
    category: "Combos & Baskets",
    shop: "Combos",
    delivery: "Tomorrow",
    amount: 799,
  },
  {
    title: "Bath Pampering Box With Tea Lights And Dark Choco",
    price: 2649,
    originalPrice: 2899,
    discount: "9% Off",
    slug: "bath-pamper-box-choco",
    image: choco3,
    category: "Combos & Baskets",
    shop: "Combos",
    delivery: "Tomorrow",
    amount: 2649,
  },
  {
    title: "Artisanal Chocolate Bar Set Of 2",
    price: 849,
    originalPrice: 949,
    discount: "10% Off",
    slug: "artisanal-choco-set-2",
    image: choco4,
    category: "Combos & Baskets",
    shop: "Combos",
    delivery: "Tomorrow",
    amount: 849,
  },
];

export default function LuxuryItems() {
  const [items, setItems] = useState(defaultItems);
  const [selected, setSelected] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist-page2")) || [];
  });

  const { addProducts } = useProduct();

  useEffect(() => {
    setItems(defaultItems);

    fetch("https://your-backend.com/api/products?shop=Combos")
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
        console.error("Failed to fetch from backend:", err.message);
      });
  }, []);

  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem("wishlist-page2");
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
    localStorage.setItem("wishlist-page2", JSON.stringify(updated));
    toast.success(`${exists ? "Removed from" : "Added to"} Wishlist: ${item.title}`);
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const scrollToSelf = () => {
      const el = document.getElementById("luxury-items-section");
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset = rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    };
    window.addEventListener("scroll-to-page2", scrollToSelf);
    return () => window.removeEventListener("scroll-to-page2", scrollToSelf);
  }, []);

  return (
    <div
      id="luxury-items-section"
      className="bg-[#7669c1] py-12 px-4 sm:px-6 lg:px-8 text-white"
    >
      <Cards
        title="Luxury Items"
        data={items}
        selectedItem={selected}
        onSelect={setSelected}
        viewMoreLink="/store?category=Combos%20%26%20Baskets&shop=Combos"
        itemKey={(item, i) => `page2-${item?.slug || `default-${i}`}`}
        renderItem={(item, _, isActive) =>
          !item ? null : (
            <Link
              to={`/product/${item.slug}`}
              className="relative group p-3 h-[320px] flex flex-col bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden text-gray-900"
              onClick={() => setSelected(item)}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-28 md:h-44 object-contain rounded-lg"
                />
                <button
                  className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow group-hover:scale-110 transition"
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
              </div>

              <div className="mt-4 flex flex-col justify-between flex-1">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {item.title}
                </h3>
                <div className="mt-2 text-sm">
                  ₹{item.amount}
                  {item.originalPrice && (
                    <span className="line-through ml-2 text-gray-500 text-xs">
                      ₹{item.originalPrice}
                    </span>
                  )}
                  {item.discount && (
                    <span className="ml-2 text-green-600 text-xs font-medium">
                      {item.discount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1">{item.delivery}</p>
              </div>
            </Link>
          )
        }
      />
    </div>
  );
}
