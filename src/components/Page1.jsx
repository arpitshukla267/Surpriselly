import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaBaby } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  GiGiftOfKnowledge,
  GiClothes,
  GiTechnoHeart,
  GiHomeGarage,
  GiFruitBowl,
  GiFlowers,
  GiChocolateBar,
  GiPlantSeed,
} from "react-icons/gi";
import hamper from "../assets/hamper.jpeg";
import sameDay from "../assets/sameDay.jpeg";
import cakes from "../assets/cakes.jpeg";
import combos from "../assets/combos.jpeg";
import flowers from "../assets/flowers.jpeg";
import plants from "../assets/plants.jpeg";
import personlizedGifts from "../assets/personlizedGifts.jpeg";
import handMade from "../assets/handMade.jpeg";
import foods from "../assets/foods.jpeg";
import festivals from "../assets/festivals.jpeg";
import banner1 from "../assets/banner-1.jpeg";

const slides = [
  {
    id: 1,
    heading: "Send Gifts to Loved Ones in Your City within Minutes",
    sub: "A Surprise Gift",
    img: "https://i.pinimg.com/736x/40/c7/58/40c758a0af210d440428ca41f6b72687.jpg",
  },
  {
    id: 2,
    heading: "Make Someone Smile with a Surprise Delivery",
    sub: "Fast & Reliable",
    img: "https://i.pinimg.com/736x/02/9b/15/029b15eaabac6c46d9730ba182045187.jpg",
  },
  {
    id: 3,
    heading: "Celebrate Every Moment with the Perfect Gift",
    sub: "Crafted with Love",
    img: "https://i.pinimg.com/736x/51/ee/9e/51ee9e360f63a3b047f24f01a6c1d696.jpg",
  },
];

const categories = [
  { title: "Personalized Gifts", icon: <GiGiftOfKnowledge /> },
  { title: "Fashion & Accessories", icon: <GiClothes /> },
  { title: "Electronics & Gadgets", icon: <GiTechnoHeart /> },
  { title: "Home & Decor", icon: <GiHomeGarage /> },
  { title: "Combo Baskets", icon: <GiFruitBowl /> },
  { title: "Toys & Games", icon: <FaBaby /> },
];

const block = [
  { label: "Birthday", img: cakes, slug: "/store?category=Occasions&shop=Birthday" },
  { label: "Combos", img: combos, slug: "/store?category=Combos%20%26%20Baskets&shop=Combos" },
  { label: "Hampers", img: hamper, slug: "/store?category=Hampers" },
  { label: "Flowers", img: flowers, slug: "/store?category=Flowers" },
  { label: "Plants", img: plants, slug: "/store?category=Plants" },
];

const block2 = [
  { label: "Festivals", img: festivals, slug: "/store?category=Festivals" },
  { label: "Handmade", img: handMade, slug: "/store?category=Handmade" },
  { label: "Sameday Delivery", img: sameDay, slug: "/store" },
  { label: "Personlized Gifts", img: personlizedGifts, slug: "/store?category=Personalized%20Gifts" },
  { label: "Foods", img: foods, slug: "/store?category=Food%20%26%20Beverages" },
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
    <div className="flex flex-col items-center justify-center mt-[2rem] px-4 lg:px-0 lg:mt-[7rem] bg-white text-black">
      
      {/* ✅ Fixed Horizontal Scroll Section */}
      <div className="md:hidden w-full overflow-x-auto mt-5 mb-0 flex flex-col scrollbar-hide">
        <div className="flex flex-nowrap gap-4 px-0 py-2 w-max">
          {block.map((item, idx) => (
      <Link
        to={item.slug}
        key={idx}
        className="flex flex-col items-center min-w-[96px] mt-[2rem]"
      >
        <img
          src={item.img}
          className="h-20 w-20 object-cover rounded-2xl"
          alt={item.label}
        />
        <span className="text-sm mt-3 text-center break-words w-[80px]">
          {item.label}
        </span>
      </Link>
          ))}
        </div>
      </div>
      
      <div className="md:hidden w-full overflow-x-auto mt-0 mb-4 flex flex-col scrollbar-hide">
        <div className="flex flex-nowrap gap-4 px-0 py-4 w-max mt-[-2rem]">
          {block2.map((item, idx) => (
      <Link
        to={item.slug}
        key={idx}
        className="flex flex-col items-center min-w-[96px] mt-[2rem]"
      >
        <img
          src={item.img}
          className="h-20 w-20 object-cover rounded-2xl"
          alt={item.label}
        />
        <span className="text-sm mt-3 text-center break-words w-[80px]">
          {item.label}
        </span>
      </Link>
          ))}
        </div>
      </div>
      
      {/* ── Hero Section ── */}
      <div
        className="relative w-full max-w-screen-xl mb-8 lg:mb-0 overflow-hidden rounded-3xl shadow-lg my-0"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] rounded-3xl">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                i === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="w-full h-full flex items-center justify-start md:px-14 px-4 rounded-3xl">
                <div className="relative md:max-w-md p-5 rounded-2xl backdrop-blur-xs md:backdrop-blur-md text-white space-y-2 sm:space-y-3 animate-slide-text overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/0 pointer-events-none" />
                  
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold">
                    {slide.heading}
                  </h2>
                  <p className="text-sm sm:text-base">{slide.sub}</p>
                  
                  {/* ✅ Hero CTA linked to /store */}
                  <Link
                    to="/store"
                    className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 sm:px-6 rounded-full font-semibold text-sm sm:text-base"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ── Scrollable Category Bar ── */}
      <div className="relative md:mt-6 mt-0 md:ml-10 w-full pb-14 max-w-screen-xl mb-[-2rem]">
        <div className="flex items-center relative">
          <button
            onClick={() => scrollCategories("left")}
            className="hidden md:flex absolute left-[-2rem] top-1/2 -translate-y-1/2 z-10 bg-gray-100 p-2 rounded-full shadow hover:bg-white"
          >
            <FaChevronLeft />
          </button>

          <div
            ref={categoryRef}
            className="flex overflow-x-auto gap-10 md:gap-4 px-2 py-4 scroll-smooth scrollbar-hide w-full"
          >
            {categories.map((cat, index) => (
              <Link
                to={
                  cat.title === "Combo Baskets"
                    ? "/store?category=Combos%20%26%20Baskets&shop=Combos"
                    : `/store?category=${encodeURIComponent(cat.title)}`
                }
                key={index}
                className="flex flex-col items-center text-center min-w-[70px] sm:min-w-[90px] hover:scale-105 hover:text-purple-700 transition-transform"
              >
                <div className="h-22 w-22 md:h-34 md:w-34 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xl sm:text-2xl shadow-md">
                  {cat.icon}
                </div>
                <p className="mt-2 text-xs font-semibold whitespace-wrap">
                  {cat.title}
                </p>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scrollCategories("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 p-2 rounded-full shadow hover:bg-white"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
