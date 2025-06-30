import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext"; // ✅ Import context

import choco1 from "../assets/react.svg";
import choco2 from "../assets/react.svg";
import choco3 from "../assets/react.svg";
import choco4 from "../assets/react.svg";

const mockFetch = () =>
  new Promise((res) =>
    setTimeout(() => {
      res([
        {
          title: "Dark Chocolate Bar Set Of 2",
          price: 849,
          originalPrice: 999,
          discount: "15% Off",
          slug: "dark-chocolate-bar-set-2",
          image: choco1,
          delivery: "Tomorrow",
        },
        {
          title: "Sweeter Festive Dark Chocolate Fruit Mix Box",
          price: 799,
          slug: "festive-choco-mix-box",
          image: choco2,
          delivery: "Tomorrow",
        },
        {
          title: "Bath Pampering Box With Tea Lights And Dark Choco",
          price: 2649,
          originalPrice: 2899,
          discount: "9% Off",
          slug: "bath-pamper-box-choco",
          image: choco3,
          delivery: "Tomorrow",
        },
        {
          title: "Artisanal Chocolate Bar Set Of 2",
          price: 849,
          originalPrice: 949,
          discount: "10% Off",
          slug: "artisanal-choco-set-2",
          image: choco4,
          delivery: "Tomorrow",
        },
      ]);
    }, 1000)
  );

export default function Page2() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist-page2")) || [];
  });

  const { addProducts } = useProduct(); // ✅ inject product data into context

  useEffect(() => {
    mockFetch().then((data) => {
      setItems(data);
      setLoading(false);
      addProducts(data); // ✅ Push products to ProductContext
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

  const shimmerArray = new Array(4).fill(null);

  useEffect(() => {
    const scrollToSelf = () => {
      const el = document.getElementById("page2-section");
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset =
          rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    };
    window.addEventListener("scroll-to-page2", scrollToSelf);
    return () => window.removeEventListener("scroll-to-page2", scrollToSelf);
  }, []);

  return (
    <div
      id="page2-section"
      className="bg-purple-50 py-12 mb-[-6rem] px-4 sm:px-6 lg:px-8 min-h-auto"
    >
      <Cards
        title="Combos & Baskets"
        data={loading ? shimmerArray : items}
        selectedItem={selected}
        onSelect={setSelected}
        viewMoreLink="/products"
        itemKey={(item, i) => `page2-${item?.slug || `shimmer-${i}`}`}
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
                onClick={(e) => {
                  e.preventDefault(); // prevent <Link> navigation
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
