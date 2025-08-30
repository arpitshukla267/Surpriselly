import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";
import { useWishlist } from "./WishlistContext";

import choco1 from "../assets/react.svg";
import choco2 from "../assets/react.svg";
import choco3 from "../assets/react.svg";
import choco4 from "../assets/react.svg";

const defaultItems = [
        {
          title: "Shirt",
          price: 849,
          originalPrice: 999,
          discount: "15% Off",
          slug: "shirt",
          image: "https://i.pinimg.com/736x/f0/5f/80/f05f80c95be38698af4178e19b2696d9.jpg",
          delivery: "Tomorrow",
        },
        {
          title: "T-Shirt",
          price: 799,
          slug: "t-shirt",
          image: "https://i.pinimg.com/1200x/5a/4b/ab/5a4bab5f3e59eabf85a71ffe2f8b7f86.jpg",
          delivery: "Tomorrow",
        },
        {
          title: "Jeans",
          price: 2649,
          originalPrice: 2899,
          discount: "9% Off",
          slug: "jeans",
          image: "https://i.pinimg.com/736x/37/cc/c8/37ccc8de341e739a8786510272f2494e.jpg",
          delivery: "Tomorrow",
        },
        {
          title: "Baggy Pants",
          price: 849,
          originalPrice: 949,
          discount: "10% Off",
          slug: "baggy-pants",
          image: "https://i.pinimg.com/736x/c6/59/fd/c659fd0e96f0144adb6416e73b2dfd17.jpg",
          delivery: "Tomorrow",
        },
      ]

export default function Page6() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const { toggleWishlist, isInWishlist } = useWishlist();
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
  
  

  const shimmerArray = new Array(4).fill(null);

  useEffect(() => {
    const scrollToSelf = () => {
      const el = document.getElementById("page6-section");
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset =
          rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    };
    window.addEventListener("scroll-to-page6", scrollToSelf);
    return () => window.removeEventListener("scroll-to-page6", scrollToSelf);
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
      id="page6-section"
      className="bg-purple-50 py-12 mb-[-6rem] px-0 sm:px-6 lg:px-8 min-h-auto"
    >
      <Cards
        title="Fashion & Accessories"
        data={loading ? shimmerArray : items}
        selectedItem={selected}
        onSelect={setSelected}
        viewMoreLink="/store?category=Fashion%20%26%20Accessories"
        itemKey={(item, i) => `page6-${item?.slug || `shimmer-${i}`}`}
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
                className="w-full h-34 md:h-44 object-cover rounded-lg"
              />
              <button
                className="absolute top-4 right-4 bg-white p-1.5 rounded-full shadow group-hover:scale-105 transition"
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
