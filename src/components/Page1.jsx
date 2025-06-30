import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    heading: "Send Gifts to Loved Ones in Your City within Minutes",
    sub: "A Surprise Gift",
    img: "https://images.unsplash.com/photo-1739022113824-6b86cf63c4cf?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    heading: "Make Someone Smile with a Surprise Delivery",
    sub: "Fast & Reliable",
    img: "https://images.unsplash.com/photo-1606787360230-2f8b1c3d4e5f?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    heading: "Celebrate Every Moment with the Perfect Gift",
    sub: "Crafted with Love",
    img: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60",
  },
];

const categories = [
  { title: "Personalized Gifts" },
  { title: "Fashion & Accessories" },
  { title: "Electronics & Gadgets" },
  { title: "Home & Decor" },
  { title: "Combo Baskets" },
  { title: "Toys & Games" },
  { title: "Flowers" },
  { title: "Chocolates" },
  { title: "Plants" },
];

export default function Page1() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const categoryRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const delay = 3000;

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(nextSlide, delay);
    return () => clearInterval(interval);
  }, [current, paused]);

  const scrollCategories = (dir) => {
    const el = categoryRef.current;
    if (el) {
      el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[8rem] md:mt-[15rem] bg-white text-black">
      {/* ── Hero Section ── */}
      <div
        className="relative w-full max-w-screen-xl overflow-hidden rounded-3xl shadow-lg my-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-[450px] rounded-3xl">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="bg-black/40 w-full h-full flex items-center justify-start pl-6 sm:pl-10 rounded-3xl">
                <div className="max-w-md text-white space-y-3 animate-slide-text">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    {slide.heading}
                  </h2>
                  <p className="text-sm">{slide.sub}</p>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/70 p-2 shadow-md hover:bg-white"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/70 p-2 shadow-md hover:bg-white"
        >
          <FaChevronRight />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition ${
                i === current ? "bg-red-400 scale-110" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* ── Category Section ── */}
      <div className="relative mt-6 w-full max-w-screen-xl">
        <button
          onClick={() => scrollCategories("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 p-2 rounded-full shadow hover:bg-white"
        >
          <FaChevronLeft />
        </button>

        <div
          ref={categoryRef}
          className="flex overflow-x-auto gap-4 px-12 py-6 scroll-smooth scrollbar-hide"
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center w-28 min-w-[90px]"
            >
              <div className="h-20 w-20 rounded-full bg-gray-300 shadow-md" />
              <p className="mt-2 text-xs font-semibold">{cat.title}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollCategories("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 p-2 rounded-full shadow hover:bg-white"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
