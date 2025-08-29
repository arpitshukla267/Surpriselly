import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";
import { useWishlist } from "./WishlistContext"; // ✅ shared wishlist

import choco1 from "../assets/react.svg";
import choco2 from "../assets/react.svg";
import choco3 from "../assets/react.svg";
import choco4 from "../assets/react.svg";

// ✅ Simulated API with raw structure
const defaultItems = [
        {
          title: "Doll House",
          price: 849,
          originalPrice: 999,
          discount: "15% Off",
          slug: "doll-house",
          image: "https://i.pinimg.com/736x/a0/01/e9/a001e948893ea189becbb07837fde5e2.jpg",
          delivery: "Tomorrow",
        },
        {
          title: "Teddy Bear",
          price: 799,
          slug: "teddy-bear",
          image: "https://i.pinimg.com/736x/5a/96/15/5a96157a5c149bca761353bead2afc6c.jpg",
          delivery: "Tomorrow",
        },
        {
          title: "Panda",
          price: 2649,
          originalPrice: 2899,
          discount: "9% Off",
          slug: "panda",
          image: "https://i.pinimg.com/1200x/b1/94/04/b194048ef5e1fd0c74beb4895ee05565.jpg",
          delivery: "Tomorrow",
        },
        {
          title: "Car",
          price: 849,
          originalPrice: 949,
          discount: "10% Off",
          slug: "car",
          image: "https://i.pinimg.com/736x/53/ae/c3/53aec3f15bc19946f784dc685247984c.jpg",
          delivery: "Tomorrow",
        },
]

export default function Page4() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const shimmerArray = new Array(4).fill(null);

  const { addProducts } = useProduct();
  const { toggleWishlist, isInWishlist } = useWishlist();

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
    const scrollToSelf = () => {
      const el = document.getElementById("page4-section");
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset =
          rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    };
    window.addEventListener("scroll-to-page4", scrollToSelf);
    return () => window.removeEventListener("scroll-to-page4", scrollToSelf);
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
      id="page4-section"
      className="bg-purple-50 py-12 mb-[-6rem] px-0 sm:px-6 lg:px-8 min-h-auto"
    >
      <Cards
        title="Toys & Games"
        data={loading ? shimmerArray : items}
        selectedItem={selected}
        onSelect={setSelected}
        viewMoreLink="/store?category=Toys%20%26%20Games"
        itemKey={(item, i) => `page4-${item?.slug || `shimmer-${i}`}`}
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
                className="w-full h-24 md:h-44 object-cover rounded-lg"
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
