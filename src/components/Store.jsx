import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";
import toast, { Toaster } from "react-hot-toast";

const allProducts = [
  {
    title: "Pious M18 Dual Sim Mobile",
    amount: 934,
    category: "Electronics & Gadgets",
    slug: "pious-m18-dual-sim",
    img: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/j/m/p/-original-imagtddkhhhgqhzy.jpeg?q=70",
  },
  {
    title: "Pepsi",
    amount: 50,
    category: "Foods & Beverages",
    slug: "pious-m18-dual-sim",
    img: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/j/m/p/-original-imagtddkhhhgqhzy.jpeg?q=70",
  },
  {
    title: "Protein Powder",
    amount: 500,
    category: "Wellness & Self-Care",
    slug: "pious-m18-dual-sim",
    img: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/j/m/p/-original-imagtddkhhhgqhzy.jpeg?q=70",
  },
  {
    title: "POCO C71 (Cool Blue, 128 GB)",
    amount: 6999,
    category: "Electronics & Gadgets",
    slug: "poco-c71-cool-blue",
    img: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/b/n/t/-original-imagzjhwtzazsc2h.jpeg?q=70",
  },
  {
    title: "Red Toy Train Set for Kids",
    amount: 799,
    category: "Toys & Games",
    slug: "red-toy-train-set",
    img: "https://rukminim2.flixcart.com/image/312/312/kz8qsnk0/toy-train/n/t/0/train-toy-train-set-for-kids-railway-track-toy-with-light-and-original-imagbfxgdzpgjzyv.jpeg?q=70",
  },
  {
    title: "Gold Plated Crystal Necklace",
    amount: 1499,
    category: "Jewellery",
    slug: "gold-plated-necklace",
    img: "https://rukminim2.flixcart.com/image/312/312/kx6fwcw0/necklace-chain/n/m/k/crystal-necklace-set-gold-plated-original-imag9z6hz2cvfhjz.jpeg?q=70",
  },
  {
    title: "Decorative Wall Mirror",
    amount: 1899,
    category: "Home & Decor",
    slug: "decorative-wall-mirror",
    img: "https://rukminim2.flixcart.com/image/312/312/kzvlua80/mirror/k/2/f/24-wall-decorative-round-golden-wall-mirror-for-living-room-original-imagb88cm3szjhyb.jpeg?q=70",
  },
  {
    title: "Men's Slim Fit Jeans",
    amount: 1299,
    category: "Fashion & Accesories",
    slug: "mens-slim-fit-jeans",
    img: "https://rukminim2.flixcart.com/image/312/312/xif0q/jean/s/g/n/32-12166790-roadster-original-imagqfghzqjryz9v.jpeg?q=70",
  },
  {
    title: "LED Strip Lights for Room",
    amount: 499,
    category: "Home & Decor",
    slug: "led-strip-lights",
    img: "https://rukminim2.flixcart.com/image/312/312/xif0q/home-lighting/o/l/b/5-meter-rgb-led-strip-light-with-remote-controller-and-adapter-original-imagz5ykskvhqq4z.jpeg?q=70",
  },
  {
    title: "Barbie Doll Princess Set",
    amount: 899,
    category: "Toys & Games",
    slug: "barbie-doll-princess",
    img: "https://rukminim2.flixcart.com/image/312/312/kosxzm80/doll/b/6/p/doll-set-barbie-doll-princess-fashion-toy-original-imag39fnsh3s5vzq.jpeg?q=70",
  },
  {
    title: "feathers",
    amount: 899,
    category: "Personlized Gifts",
    slug: "barbie-doll-princess",
    img: "https://rukminim2.flixcart.com/image/312/312/kosxzm80/doll/b/6/p/doll-set-barbie-doll-princess-fashion-toy-original-imag39fnsh3s5vzq.jpeg?q=70",
  },
  {
    title: "Oxidized Silver Earrings",
    amount: 349,
    category: "Jewellery",
    slug: "oxidized-silver-earrings",
    img: "https://rukminim2.flixcart.com/image/312/312/kxm5qq80/earring/k/f/7/oxidised-earrings-for-women-and-girls-party-wear-fashion-original-imag9yrmpnzuyasf.jpeg?q=70",
  },
  {
    title: "Pedigree Dog Food",
    amount: 849,
    category: "Pet Supplies",
    slug: "pedigree-dog-food",
    img: "",
  },
];

const categories = ["All", ...new Set(allProducts.map((p) => p.category))];

export default function Store() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    if (location.pathname === "/store") {
      const section = document.getElementById("store-section");
      if (section) section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [location]);

  const filtered = allProducts
    .filter((item) =>
      selectedCategory === "All" ? true : item.category === selectedCategory
    )
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => item.amount <= maxPrice);

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  return (
    <div id="store-section" className="p-6 max-w-6xl mt-[12rem] mx-auto space-y-10">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-center">🛍️ Product Store</h1>

      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            className={clsx(
              "px-4 py-1 rounded-full border text-sm transition-all",
              selectedCategory === cat
                ? "bg-purple-600 text-white"
                : "bg-white border-purple-300 text-purple-700 hover:bg-purple-100"
            )}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div>
          <label className="font-semibold block">Max Price: ₹{maxPrice}</label>
          <input
            type="range"
            min="0"
            max="20000"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedProducts.length === 0 ? (
          <p className="col-span-full text-center">No matching products.</p>
        ) : (
          paginatedProducts.map((item, index) => {
            const wished = isInWishlist(item.slug);
            return (
              <div
                key={index}
                className="group border rounded-lg shadow p-4 bg-white hover:shadow-lg transition-all duration-300 relative"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                <p className="text-purple-700 font-bold">₹{item.amount}</p>

                <button
                  onClick={() => {
                    toggleWishlist(item);
                    const newWished = !wished;
                    toast.success(
                      `${newWished ? "Added to" : "Removed from"} Wishlist: ${item.title}`
                    );
                  }}
                  className={`absolute top-3 right-3 text-2xl transition-transform duration-300 ${
                    wished
                      ? "text-red-500 scale-110"
                      : "text-gray-400 group-hover:scale-110"
                  }`}
                >
                  {wished ? "❤️" : "🤍"}
                </button>

                <button
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 rounded transition"
                  onClick={() => {
                    addToCart(item);
                    toast.success(`${item.title} added to cart!`);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-purple-100 hover:bg-purple-200 rounded"
          >
            Previous
          </button>
          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-purple-100 hover:bg-purple-200 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
