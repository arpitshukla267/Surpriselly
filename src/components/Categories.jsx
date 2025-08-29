import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";

const categories = [
  { name: "Birthday", icon: "🎂", shop: "Birthday", label: "Birthday Shop" },
  { name: "Anniversary", icon: "⏳", shop: "Anniversary" },
  { name: "Love Once", icon: "💚", shop: "Love Once" },
  { name: "Congratulations", icon: "🙌", shop: "Congratulations" },
  { name: "Thank You", icon: "👍", shop: "Thank You" },
];

const categoryGifts = {
   Birthday: [
    {
      title: "Angelic Rose Bouquet",
      price: 949,
      originalPrice: 999,
      rating: 5,
      reviews: 256,
      slug: "angelic-rose-birthday-bliss",
      image:
        "https://www.fnp.com/images/pr/l/v20221201183812/angelic-rose-bouquet-n-black-forest-birthday-bliss_1.jpg",
    },
    {
      title: "Golden Glow Sansevieria Birthday Planter",
      price: 899,
      originalPrice: null,
      rating: 5,
      reviews: 98,
      slug: "golden-glow-sansevieria",
      image:
        "https://www.fnp.com/images/pr/l/v20211210124700/golden-glow-sansevieria-birthday-planter_1.jpg",
    },
  ],
  Anniversary: [
    {
      title: "Anniversary Chocolate Box",
      price: 599,
      originalPrice: 699,
      rating: 4.8,
      reviews: 110,
      slug: "anniversary-chocolate-box",
      image: "https://i.pinimg.com/736x/34/14/93/341493f75d0c7fe0406a2661bdc06f72.jpg",
    },
  ],
  "Loved Once": [
    {
      title: "Red Roses & Heart Shaped Cake",
      price: 1299,
      originalPrice: 1499,
      rating: 5,
      reviews: 320,
      slug: "red-roses-heart-cake",
      image: "https://i.pinimg.com/736x/d3/48/88/d3488813661464fa7e7f067dcb673562.jpg",
    },
  ],
  Congratulations: [
    {
      title: "Congrats Flowers & Card",
      price: 749,
      originalPrice: 799,
      rating: 4.9,
      reviews: 72,
      slug: "congrats-flowers-card",
      image: "https://i.pinimg.com/736x/d4/67/1b/d4671bc0b22ea1970824174896b70481.jpg",
    },
  ],
  "Thank You": [
    {
      title: "Thank You Succulent Gift Box",
      price: 499,
      originalPrice: 549,
      rating: 4.7,
      reviews: 65,
      slug: "thank-you-succulent-box",
      image: "https://i.pinimg.com/1200x/54/88/2e/54882eec1251d92ad1d447b1c640eb99.jpg",
    },
  ],
};

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState("Birthday");
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });
  const { addProducts } = useProduct();

  useEffect(() => {
    const allProducts = Object.values(categoryGifts)
      .flat()
      .map((item) => ({
        ...item,
        amount: item.price,
        category: "Occasions",
        shop:
          categories.find((c) => c.name === activeCategory)?.shop || "",
      }));
    addProducts(allProducts);
  }, []);

  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem("wishlist");
      setWishlist(stored ? JSON.parse(stored) : []);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const toggleWishlist = (item) => {
    const exists = wishlist.some((i) => i.slug === item.slug);
    const updated = exists
      ? wishlist.filter((i) => i.slug !== item.slug)
      : [...wishlist, item];

    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlist(updated);

    toast.success(
      exists
        ? `${item.title} removed from wishlist.`
        : `${item.title} added to wishlist!`
    );

    window.dispatchEvent(new Event("storage"));
  };

  const switchCategory = (newCategory) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveCategory(newCategory);
      setIsLoading(false);
    }, 400);
  };

  const currentCategory = categories.find((cat) => cat.name === activeCategory);
  const currentShop = currentCategory?.shop || "";

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-purple-50">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-800 mb-8">
          For Occasions
        </h2>

        {/* CATEGORY BAR */}
        <div className="max-w-7xl bg-purple-50 mx-auto rounded-2xl lg:rounded-4xl p-1 mb-10 overflow-hidden relative">
          <div className="flex md:gap-6 gap-0 overflow-x-auto flex-nowrap rounded-full bg-[#7669c1] px-1 py-1 md:px-2 md:py-2 sm:p-1">
            {categories.map((cat) => {
              const selected = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => switchCategory(cat.name)}
                  className={`flex-shrink-0 flex items-center gap-1 sm:gap-2 md:px-3 md:py-2 px-2 py-1 rounded-full text-sm sm:text-xl font-medium transition-all duration-200 ${
                    selected
                      ? "bg-white text-[#7669c1] shadow"
                      : "bg-[#7669c1] text-white hover:cursor-pointer"
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* GIFTS GRID */}
      <div className="max-w-6xl mx-auto flex overflow-x-auto gap-3 pb-2 px-1 snap-x scroll-smooth sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 sm:overflow-x-visible">
  {isLoading ? (
    Array(4)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className="w-[100%] flex-shrink-0 snap-start sm:w-auto sm:flex-shrink sm:snap-none animate-pulse bg-white rounded-xl p-4 shadow"
        >
          <div className="h-44 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))
  ) : categoryGifts[activeCategory]?.length ? (
    categoryGifts[activeCategory].map((gift, idx) => {
      const isLiked = wishlist.some((i) => i.slug === gift.slug);
      return (
        <Link
          to={`/product/${gift.slug}`}
          key={idx}
          className="w-40 md:w-[75%] h-88 flex-shrink-0 snap-start sm:w-auto sm:flex-shrink sm:snap-none bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-200 hover:-translate-y-1"
        >
          <div className="relative h-40 md:h-[65%] w-40 md:w-full bg-gray-100">
            {gift.image ? (
              <img
                src={gift.image}
                alt={gift.title}
                className="h-full w-full object-full"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image
              </div>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(gift);
              }}
              className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow hover:scale-105 transition"
            >
              {isLiked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-500 hover:text-red-500" />
              )}
            </button>
          </div>

          <div className="md:p-3 px-2 mt-0 flex flex-col ">
            <div className="text-xs text-purple-600 mb-1">
              ⭐ {gift.rating} | {gift.reviews}
            </div>
            <div className="font-medium text-sm sm:text-base line-clamp-2 mb-0 md:mb-1">
              {gift.title}
            </div>
            <div className="text-base font-bold text-gray-800 ">
              ₹{gift.price}
              {gift.originalPrice && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  ₹{gift.originalPrice}
                </span>
              )}
            </div>
          </div>
        </Link>
      );
    })
  ) : (
    <div className="col-span-full text-center text-gray-500">
      No gifts available for {activeCategory}.
    </div>
  )}
</div>


        {/* View More */}
        <div className="text-center mt-8">
          <Link
            to={`/store?category=Occasions&shop=${encodeURIComponent(currentShop)}`}
            className="inline-block px-6 py-3 w-full md:w-fit md:px-10 rounded-full bg-purple-100 border-2 border-purple-300 text-black hover:bg-purple-700 transition"
          >
            View More from {currentShop}
          </Link>
        </div>
      </section>
    </>
  );
}
