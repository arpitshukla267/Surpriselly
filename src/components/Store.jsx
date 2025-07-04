// ✅ Store.jsx (final version with Birthday as subcategory only)

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";
import { useProduct } from "../components/ProductContext";
import toast, { Toaster } from "react-hot-toast";

import choco1 from "../assets/react.svg";
import choco2 from "../assets/react.svg";
import choco3 from "../assets/react.svg";
import choco4 from "../assets/react.svg";

const page2Products = [
  {
    title: "Dark Chocolate Bar Set Of 2",
    price: 849,
    originalPrice: 999,
    discount: "15% Off",
    slug: "dark-chocolate-bar-set-2",
    image: choco1,
    delivery: "Tomorrow",
    category: "Combos & Baskets",
    shop: "Combos",
    amount: 849,
  },
  {
    title: "Sweeter Festive Dark Chocolate Fruit Mix Box",
    price: 799,
    slug: "festive-choco-mix-box",
    image: choco2,
    delivery: "Tomorrow",
    category: "Combos & Baskets",
    shop: "Combos",
    amount: 799,
  },
  {
    title: "Bath Pampering Box With Tea Lights And Dark Choco",
    price: 2649,
    originalPrice: 2899,
    discount: "9% Off",
    slug: "bath-pamper-box-choco",
    image: choco3,
    delivery: "Tomorrow",
    category: "Combos & Baskets",
    shop: "Combos",
    amount: 2649,
  },
  {
    title: "Artisanal Chocolate Bar Set Of 2",
    price: 849,
    originalPrice: 949,
    discount: "10% Off",
    slug: "artisanal-choco-set-2",
    image: choco4,
    delivery: "Tomorrow",
    category: "Combos & Baskets",
    shop: "Combos",
    amount: 849,
  },
];

const page7Products = [
  {
    title: "Necklace",
    price: 849,
    originalPrice: 999,
    discount: "15% Off",
    slug: "necklace",
    image: choco1,
    delivery: "Tomorrow",
    category: "Jewellery",
    shop: "Necklace",
    amount: 849,
  },
  {
    title: "Bangles",
    price: 799,
    slug: "bangles",
    image: choco2,
    delivery: "Tomorrow",
    category: "Jewellery",
    shop: "Bangles",
    amount: 799,
  },
  {
    title: "Diamond Ring",
    price: 2649,
    originalPrice: 2899,
    discount: "9% Off",
    slug: "diamond-ring",
    image: choco3,
    delivery: "Tomorrow",
    category: "Jewellery",
    shop: "Rings",
    amount: 2649,
  },
  {
    title: "Gold Earrings",
    price: 849,
    originalPrice: 949,
    discount: "10% Off",
    slug: "gold-earrings",
    image: choco4,
    delivery: "Tomorrow",
    category: "Jewellery",
    shop: "Earrings",
    amount: 849,
  },
];

const page8Products = [
  {
    title: "Pedigree Dog Food",
    price: 849,
    originalPrice: 999,
    discount: "15% Off",
    slug: "pedigree-dog-food",
    image: choco1,
    delivery: "Tomorrow",
    category: "Pets & Gifts",
    shop: "Pet Food",
    amount: 849,
  },
  {
    title: "Whiskas Cat Food",
    price: 799,
    slug: "whiskas-cat-food",
    image: choco2,
    delivery: "Tomorrow",
    category: "Pets & Gifts",
    shop: "Pet Food",
    amount: 799,
  },
  {
    title: "Choco Treats",
    price: 2649,
    originalPrice: 2899,
    discount: "9% Off",
    slug: "choco-treats",
    image: choco3,
    delivery: "Tomorrow",
    category: "Pets & Gifts",
    shop: "Pet Food",
    amount: 2649,
  },
  {
    title: "Clothes for Pets",
    price: 849,
    originalPrice: 949,
    discount: "10% Off",
    slug: "clothes-for-pets",
    image: choco4,
    delivery: "Tomorrow",
    category: "Pets & Gifts",
    shop: "Clothes",
    amount: 849,
  },
];
const dummyProducts = [
  { slug: "mens-wallet", title: "Men's Wallet", category: "Fashion & Accessories", shop: "Men", amount: 999, img: "https://example.com/wallet.jpg" },
  { slug: "womens-scarf", title: "Women's Scarf", category: "Fashion & Accessories", shop: "Women", amount: 799, img: "https://example.com/scarf.jpg" },
  { slug: "silver-earrings", title: "Silver Earrings", category: "Fashion & Accessories", shop: "Jewelry", amount: 1299, img: "https://example.com/earrings.jpg" },
  { slug: "modern-wall-clock", title: "Modern Wall Clock", category: "Home & Decor", shop: "Wall Art", amount: 1499, img: "https://example.com/clock.jpg" },
  { slug: "led-lights", title: "LED String Lights", category: "Home & Decor", shop: "Lighting", amount: 699, img: "https://example.com/lights.jpg" },
  { slug: "coffee-table", title: "Wooden Coffee Table", category: "Home & Decor", shop: "Furniture", amount: 4999, img: "https://example.com/table.jpg" },
  { slug: "chocolate-cake", title: "Chocolate Cake", category: "Food & Beverages", shop: "Cakes", amount: 599, img: "https://example.com/cake.jpg" },
  { slug: "potato-chips", title: "Potato Chips", category: "Food & Beverages", shop: "Snacks", amount: 99, img: "https://example.com/chips.jpg" },
  { slug: "fruit-juice", title: "Fruit Juice", category: "Food & Beverages", shop: "Drinks", amount: 149, img: "https://example.com/juice.jpg" },
  { slug: "pious-mobile", title: "Pious M18 Dual Sim Mobile", category: "Electronics & Gadgets", shop: "Mobile", amount: 934, img: "https://example.com/mobile.jpg" },
  { slug: "poco-c71", title: "POCO C71 (Cool Blue, 128 GB)", category: "Electronics & Gadgets", shop: "Laptop", amount: 6999, img: "https://example.com/laptop.jpg" },
  { slug: "bluetooth-earbuds", title: "Bluetooth Earbuds", category: "Electronics & Gadgets", shop: "Accessories", amount: 2999, img: "https://example.com/earbuds.jpg" },
  { slug: "toy-train", title: "Red Toy Train Set for Kids", category: "Toys & Games", shop: "Kids", amount: 799, img: "https://example.com/train.jpg" },
  { slug: "puzzle-set", title: "Puzzle Set", category: "Toys & Games", shop: "Educational", amount: 499, img: "https://example.com/puzzle.jpg" },
  { slug: "frisbee", title: "Frisbee", category: "Toys & Games", shop: "Outdoor", amount: 199, img: "https://example.com/frisbee.jpg" },
  { slug: "protein-powder", title: "Protein Powder", category: "Wellness & Selfcare", shop: "Skincare", amount: 500, img: "https://example.com/protein.jpg" },
  { slug: "fitness-dumbbells", title: "Fitness Dumbbells", category: "Wellness & Selfcare", shop: "Fitness", amount: 999, img: "https://example.com/dumbbells.jpg" },
  { slug: "aroma-oil", title: "Aroma Oil", category: "Wellness & Selfcare", shop: "Relaxation", amount: 499, img: "https://example.com/aroma.jpg" },
  { slug: "custom-mug", title: "Custom Mug", category: "Personalized Gifts", shop: "Custom", amount: 299, img: "https://example.com/mug.jpg" },
  { slug: "engraved-pen", title: "Engraved Pen", category: "Personalized Gifts", shop: "Engraved", amount: 399, img: "https://example.com/pen.jpg" },
  { slug: "photo-frame", title: "Custom Photo Frame", category: "Personalized Gifts", shop: "Photo Gifts", amount: 899, img: "https://example.com/photoframe.jpg" },
];

const occasionProducts = [
  {
    title: "Angelic Rose Bouquet N Black Forest Birthday Bliss",
    price: 949,
    originalPrice: 999,
    slug: "angelic-rose-birthday-bliss",
    image: "https://www.fnp.com/images/pr/l/v20221201183812/angelic-rose-bouquet-n-black-forest-birthday-bliss_1.jpg",
    category: "Occasions",
    shop: "Birthday",
    amount: 949,
  },
  {
    title: "Golden Glow Sansevieria Birthday Planter",
    price: 899,
    slug: "golden-glow-sansevieria",
    image: "https://www.fnp.com/images/pr/l/v20211210124700/golden-glow-sansevieria-birthday-planter_1.jpg",
    category: "Occasions",
    shop: "Birthday",
    amount: 899,
  },
  {
    title: "Anniversary Chocolate Box",
    price: 599,
    slug: "anniversary-chocolate-box",
    image: "https://www.fnp.com/images/pr/l/v20221112122300/chocolate-box_1.jpg",
    category: "Occasions",
    shop: "Anniversary",
    amount: 599,
  },
  {
    title: "Thank You Succulent Gift Box",
    price: 499,
    slug: "thank-you-succulent-box",
    image: "https://www.fnp.com/images/pr/l/v20220101122211/thank-you-succulent-box_1.jpg",
    category: "Occasions",
    shop: "Thank You",
    amount: 499,
  },
  {
    title: "Red Roses & Heart Shaped Cake",
    price: 1299,
    slug: "red-roses-heart-cake",
    image: "",
    category: "Occasions",
    shop: "Love Once",
    amount: 1299,
  },
  {
    title: "Congrats Flowers & Card",
    price: 749,
    slug: "congrats-flowers-card",
    image: "",
    category: "Occasions",
    shop: "Congratulations",
    amount: 749,
  },

];


const subcategoryMap = {
  "Fashion & Accessories": ["Men", "Women", "Jewelry"],
  "Home & Decor": ["Wall Art", "Lighting", "Furniture"],
  "Food & Beverages": ["Cakes", "Snacks", "Drinks"],
  "Electronics & Gadgets": ["Mobile", "Laptop", "Accessories"],
  "Toys & Games": ["Kids", "Educational", "Outdoor"],
  "Wellness & Selfcare": ["Skincare", "Fitness", "Relaxation"],
  "Personalized Gifts": ["Custom", "Engraved", "Photo Gifts"],
  "Combos & Baskets": ["Combos", "Store"],
  "Jewellery": ["Necklace", "Earrings", "Rings"],
  "Pets & Gifts": ["Pet Food", "Toys", "Clothes"],
  "Occasions": ["Birthday", "Anniversary", "Love Once", "Congratulations", "Thank You"],
};

export default function Store() {
  const location = useLocation();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { allProducts } = useProduct();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const allCombinedRaw = [
    ...allProducts,
    ...page2Products,
    ...page7Products,
    ...page8Products,
    ...dummyProducts,
    ...occasionProducts,
  ];

  const combinedProducts = [...new Map(allCombinedRaw.map(p => [p.slug, p])).values()];

  combinedProducts.forEach((item) => {
    item.category = item.category?.trim();
    item.shop = item.shop?.trim();
  });

 useEffect(() => {
  // Scroll to top whenever location changes (i.e., new category/shop)
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [location]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const shopParam = params.get("shop");

    if (!categoryParam && !shopParam) {
      setSelectedCategory("All");
      setSelectedSubcategory(null);
      setSearchTerm("");
      setMaxPrice(20000);
    } else {
      if (categoryParam) setSelectedCategory(categoryParam);

      const validShops = subcategoryMap[categoryParam] || [];
      if (shopParam && validShops.includes(shopParam)) {
        setSelectedSubcategory(shopParam);
      } else {
        setSelectedSubcategory(null);
      }
    }
  }, [location.search]);

  const subcategories = subcategoryMap[selectedCategory] || [];

  const filtered = combinedProducts.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (item.category === selectedCategory &&
        (!selectedSubcategory || item.shop === selectedSubcategory));

    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = (item.price || item.amount) <= maxPrice;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubcategory, searchTerm, maxPrice]);

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="max-w-6xl mt-[5rem] lg:mt-[8rem] mx-auto px-6 py-10">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-center mb-6">🛍️ Product Store</h1>

      {subcategories.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            onClick={() => setSelectedSubcategory(null)}
            className={clsx(
              "px-4 py-1 rounded-full border text-sm font-semibold",
              selectedSubcategory === null
                ? "bg-purple-500 text-white"
                : "bg-white text-purple-500 hover:bg-purple-50 hover:cursor-pointer"
            )}
          >
            All
          </button>
          <span className="text-gray-400 font-bold">|</span>
          {subcategories.map((sub) => (
            <button
              key={sub}
              className={clsx(
                "px-4 py-1 rounded-full border text-sm hover:cursor-pointer",
                selectedSubcategory === sub
                  ? "bg-purple-600 text-white"
                  : "bg-white border-purple-300 text-purple-700 hover:bg-purple-100"
              )}
              onClick={() => setSelectedSubcategory(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <label className="block mb-1 font-medium">Max Price: ₹{maxPrice}</label>
          <input
            type="range"
            min="0"
            max="20000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedProducts.length === 0 ? (
          <p className="col-span-full text-center">No matching products.</p>
        ) : (
          paginatedProducts.map((item) => {
            const wished = isInWishlist(item.slug);
            return (
              <div
                key={item.slug}
                className="bg-white rounded-2xl shadow-xl p-4 hover:shadow-2xl transition-all duration-300 relative"
              >
                <img
                  src={item.image || item.img}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
                <p className="text-purple-700 font-bold text-xl">₹{item.price || item.amount}</p>

                <button
                  onClick={() => {
                    toggleWishlist(item);
                    toast.success(`${wished ? "Removed from" : "Added to"} Wishlist: ${item.title}`);
                  }}
                  className={`absolute top-3 right-3 text-2xl transition-transform duration-300 ${
                    wished ? "text-red-500 scale-110" : "text-gray-400 hover:scale-110"
                  }`}
                >
                  {wished ? "❤️" : "🤍"}
                </button>

                <button
                  onClick={() => {
                    addToCart(item);
                    toast.success(`${item.title} added to cart!`);
                  }}
                  className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-full"
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
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-purple-100 hover:bg-purple-200 rounded"
          >
            Previous
          </button>
          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
