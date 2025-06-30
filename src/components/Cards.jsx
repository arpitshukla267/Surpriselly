import React, { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Cards({
  title = "Combos & Baskets",
  data = [],
  selectedItem = null,
  renderItem,
  onSelect = () => {},
  itemKey = (item, index) => item?.slug || `shimmer-${index}`,
  viewMoreLink = "#",
  loading = false,
}) {
  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  useEffect(() => {
    const handleStorage = () => {
      const updated = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(updated);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleWishlist = (slug, title) => {
    let updated = [...wishlist];
    const index = updated.indexOf(slug);

    if (index >= 0) {
      updated.splice(index, 1);
      toast.error(`Removed: ${title}`);
    } else {
      updated.push(slug);
      toast.success(`Added: ${title}`);
    }

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const scrollCategories = (direction) => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = 280;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const diffX = touchStartX.current - endX;
      if (Math.abs(diffX) > 50) {
        scrollCategories(diffX > 0 ? "right" : "left");
      }
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const renderCard = (item, index) => {
    if (loading || !item) {
      return (
        <div className="animate-pulse p-3 space-y-3">
          <div className="w-full h-36 sm:h-44 bg-gray-300 rounded-lg" />
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
      );
    }

    const isActive = selectedItem?.title === item?.title;
    const isLiked = wishlist.includes(item.slug);

    return (
      <a
        href={item.slug ? `/product/${item.slug}` : "#"}
        className="relative group block p-3"
        onClick={() => onSelect(item)}
      >
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-36 sm:h-44 object-cover rounded-lg"
          />
        )}

        <button
          className="absolute bottom-4 right-4 bg-white p-1.5 rounded-full shadow group-hover:scale-105 transition"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(item.slug, item.title);
          }}
        >
          <FaHeart
            className={`text-sm transition ${
              isLiked ? "text-red-500" : "text-gray-500"
            }`}
          />
        </button>

        <div className="mt-3">
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
            Earliest Delivery:{" "}
            <span className="text-green-600 font-medium">
              {item.delivery}
            </span>
          </p>
        </div>
      </a>
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
        <a
          href={viewMoreLink}
          className="text-sm font-medium text-green-600 hover:underline"
        >
          View More
        </a>
      </div>

      <div className="relative">
        {/* Left Arrow (hidden on mobile) */}
        <button
          onClick={() => scrollCategories("left")}
          className="hidden sm:flex absolute left-[-1rem] top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <FaChevronLeft />
        </button>

        {/* Cards */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 py-4 px-2 sm:px-8 scroll-smooth scrollbar-hide snap-x snap-mandatory"
        >
          {data.map((item, index) => (
            <div
              key={itemKey(item, index)}
              className={`flex-shrink-0 w-52 sm:w-56 md:w-64 snap-start transition-transform duration-300 ${
                selectedItem?.title === item?.title
                  ? "scale-105 border-2 border-green-500 rounded-xl"
                  : ""
              }`}
            >
              <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
                {renderItem
                  ? renderItem(item, index, selectedItem?.title === item?.title)
                  : renderCard(item, index)}
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow (hidden on mobile) */}
        <button
          onClick={() => scrollCategories("right")}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
