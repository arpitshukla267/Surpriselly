// ✅ Store.jsx (final version with Birthday as subcategory only)

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";
import { useProduct } from "../components/ProductContext";
import toast, { Toaster } from "react-hot-toast";
import Filters from "./ui/Filters";

const page2Products = [
  {
    title: "Dark Chocolate Bar Set Of 2",
    price: 849,
    originalPrice: 999,
    discount: "15% Off",
    slug: "dark-chocolate-bar-set-2",
    image: "https://i.pinimg.com/736x/3c/40/17/3c4017ca048949362cef217fce3eed04.jpg",
    delivery: "Tomorrow",
    category: "Combos & Baskets",
    shop: "Combos",
    amount: 849,
  },
  {
    title: "Sweeter Festive Dark Chocolate Fruit Mix Box",
    price: 799,
    slug: "festive-choco-mix-box",
    image: "https://i.pinimg.com/1200x/1c/c1/5e/1cc15e50887f4a01856d80fc4871e3e9.jpg",
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
    image: "https://i.pinimg.com/1200x/6f/46/6d/6f466d92bdcca9d0f23146b4369d5325.jpg",
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
    image:  "https://i.pinimg.com/1200x/ad/74/85/ad74853b5f1ca037e7290559be4d1d8a.jpg",
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
    image: "https://i.pinimg.com/736x/28/ca/41/28ca416b445a1eccf3fd801f003b9ffd.jpg",
    delivery: "Tomorrow",
    category: "Jewellery",
    shop: "Necklace",
    amount: 849,
  },
  {
    title: "Bangles",
    price: 799,
    slug: "bangles",
    image: "https://i.pinimg.com/736x/62/7a/60/627a60cae5ad1362e06d210bd8deba1f.jpg",
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
    image: "https://i.pinimg.com/736x/30/9a/eb/309aebe4def3dc41da19618c21e56969.jpg",
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
    image: "https://i.pinimg.com/1200x/83/93/d2/8393d23e4d109d7ff4401ae2501aad6d.jpg",
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
    image: "https://i.pinimg.com/736x/6f/20/43/6f20434faecd05c4288b0399b0888ed4.jpg",
    delivery: "Tomorrow",
    category: "Pets & Gifts",
    shop: "Pet Food",
    amount: 849,
  },
  {
    title: "Whiskas Cat Food",
    price: 799,
    slug: "whiskas-cat-food",
    image:  "https://i.pinimg.com/1200x/7a/25/85/7a25858ac50db86bcf6cb069b683e381.jpg",
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
    image: "https://i.pinimg.com/736x/a6/d6/37/a6d637f0257adac6d8a62ea6d1692952.jpg",
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
    image: "https://i.pinimg.com/736x/4d/5e/3b/4d5e3bfd3a6c8cbc2488dc6bc5be8df3.jpg",
    delivery: "Tomorrow",
    category: "Pets & Gifts",
    shop: "Clothes",
    amount: 849,
  },
];

const dummyProducts = [
  { slug: "mens-wallet", title: "Men's Wallet", category: "Fashion & Accessories", shop: "Men", amount: 999, img: "https://i.pinimg.com/1200x/f9/80/d9/f980d9fa83a13fed52e352889555c9cb.jpg" },
  { slug: "women-scarf", title: "Women's Scarf", category: "Fashion & Accessories", shop: "Women", amount: 799, img: "https://i.pinimg.com/736x/bd/99/60/bd99609bc07e0ca3a3641afd56d04ea3.jpg" },
  { slug: "silver-earrings", title: "Silver Earrings", category: "Fashion & Accessories", shop: "Jewelry", amount: 1299, img: "https://i.pinimg.com/736x/76/0d/53/760d532d8d7c1f73caadbad8b7b62a9c.jpg" },
  { slug: "modern-wall-clock", title: "Modern Wall Clock", category: "Home & Decor", shop: "Wall Art", amount: 1499, img: "https://i.pinimg.com/736x/e0/3a/02/e03a02c9a56051dcb4a0c55e85fc1fa7.jpg" },
  { slug: "led-lights", title: "LED String Lights", category: "Home & Decor", shop: "Lighting", amount: 699, img: "https://i.pinimg.com/736x/f1/2d/f9/f12df980800423dd9193c6804675e84b.jpghttps://example.com/lights.jpg" },
  { slug: "coffee-table", title: "Wooden Coffee Table", category: "Home & Decor", shop: "Furniture", amount: 4999, img: "https://i.pinimg.com/1200x/5f/b6/0a/5fb60ab915d964aeb347db8b74485bff.jpg" },
  { slug: "chocolate-cake", title: "Chocolate Cake", category: "Food & Beverages", shop: "Cakes", amount: 599, img: "https://i.pinimg.com/736x/ff/9f/45/ff9f451fc6246cdcdd67313e10c27586.jpg" },
  { slug: "potato-chips", title: "Potato Chips", category: "Food & Beverages", shop: "Snacks", amount: 99, img: "https://i.pinimg.com/736x/53/18/d3/5318d33fa7759dfc925aa76290b39737.jpg" },
  { slug: "fruit-juice", title: "Fruit Juice", category: "Food & Beverages", shop: "Drinks", amount: 149, img: "https://i.pinimg.com/736x/f7/6e/f9/f76ef9a7d770433a3714a8383a38060e.jpg" },
  { slug: "iphone-15-pro", title: "Iphone 15 Pro", category: "Electronics & Gadgets", shop: "Mobile", amount: 934, img: "https://i.pinimg.com/736x/cb/2a/d0/cb2ad0bbc24149758f88797d22b54ab7.jpg" },
  { slug: "asus-vivobook-16", title: "Asus Vivobook 16", category: "Electronics & Gadgets", shop: "Laptop", amount: 6999, img: "https://i.pinimg.com/1200x/0f/4a/56/0f4a56f0588a7722a1e992c1d7097ee2.jpg" },
  { slug: "bluetooth-earbuds", title: "Bluetooth Earbuds", category: "Electronics & Gadgets", shop: "Accessories", amount: 2999, img: "https://i.pinimg.com/1200x/3b/55/9f/3b559fafd9cf32a9064e5f1104cdf11d.jpg" },
  { slug: "toy-train", title: "Red Toy Train Set for Kids", category: "Toys & Games", shop: "Kids", amount: 799, img: "https://i.pinimg.com/1200x/12/d2/4a/12d24ae04a21e8417d4f33d3781f2e1f.jpg" },
  { slug: "puzzle-set", title: "Puzzle Set", category: "Toys & Games", shop: "Educational", amount: 499, img: "https://i.pinimg.com/1200x/ea/2f/18/ea2f1862f5a7c1f31dc40a5de1ed5dcf.jpg" },
  { slug: "frisbee", title: "Frisbee", category: "Toys & Games", shop: "Outdoor", amount: 199, img: "https://i.pinimg.com/736x/58/fa/31/58fa317d443f520a004acb15b5978598.jpg" },
  { slug: "protein-powder", title: "Protein Powder", category: "Wellness & Selfcare", shop: "Skincare", amount: 500, img: "https://i.pinimg.com/1200x/ac/74/17/ac74179f9e137790bf16a957e141daa5.jpg" },
  { slug: "fitness-dumbbells", title: "Fitness Dumbbells", category: "Wellness & Selfcare", shop: "Fitness", amount: 999, img: "https://i.pinimg.com/1200x/e5/79/59/e579598ddbcc110af87d7091fdb909c9.jpg" },
  { slug: "aroma-oil", title: "Aroma Oil", category: "Wellness & Selfcare", shop: "Relaxation", amount: 499, img: "https://i.pinimg.com/1200x/be/cc/c5/beccc5721d19b94b6cf9181f29c90d5c.jpg" },
  { slug: "custom-mug", title: "Custom Mug", category: "Personalized Gifts", shop: "Custom", amount: 299, img: "https://i.pinimg.com/1200x/0b/9d/ea/0b9dea674a5058a82ddd8348c7408caa.jpg" },
  { slug: "engraved-pen", title: "Engraved Pen", category: "Personalized Gifts", shop: "Engraved", amount: 399, img: "https://i.pinimg.com/1200x/bd/c0/0a/bdc00adbcae795be94c3e256b84cc4a9.jpg" },
  { slug: "photo-frame", title: "Custom Photo Frame", category: "Personalized Gifts", shop: "Photo Gifts", amount: 899, img: "https://i.pinimg.com/736x/0e/f1/ff/0ef1ff548bfc3076d34ff82e2bb6a0b5.jpg" },
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
    image: "https://i.pinimg.com/736x/34/14/93/341493f75d0c7fe0406a2661bdc06f72.jpg",
    category: "Occasions",
    shop: "Anniversary",
    amount: 599,
  },
  {
    title: "Thank You Succulent Gift Box",
    price: 499,
    slug: "thank-you-succulent-box",
    image: "https://i.pinimg.com/1200x/54/88/2e/54882eec1251d92ad1d447b1c640eb99.jpg",
    category: "Occasions",
    shop: "Thank You",
    amount: 499,
  },
  {
    title: "Red Roses & Heart Shaped Cake",
    price: 1299,
    slug: "red-roses-heart-cake",
    image: "https://i.pinimg.com/736x/d3/48/88/d3488813661464fa7e7f067dcb673562.jpg",
    category: "Occasions",
    shop: "Love Once",
    amount: 1299,
  },
  {
    title: "Congrats Flowers & Card",
    price: 749,
    slug: "congrats-flowers-card",
    image: "https://i.pinimg.com/736x/d4/67/1b/d4671bc0b22ea1970824174896b70481.jpg",
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

  // 🌸 Newly Added
  "Flowers": ["Bouquets", "Baskets", "Decorative"],
  "Plants": ["Indoor", "Outdoor", "Decorative"],
  "Hampers": ["Sweet Treats", "Luxury", "Wellness"],
  "Handmade": ["Decor", "Fashion", "Crafts"],
};


export default function Store() {
  const location = useLocation();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { allProducts } = useProduct();
  const [sortRange, setSortRange] = useState(null);
  const allCombinedRaw = [
    ...allProducts,
    ...page2Products,
    ...page7Products,
    ...page8Products,
    ...dummyProducts,
    ...occasionProducts,
  ];


  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;


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

// Base filtered list
let filtered = combinedProducts.filter((item) => {
  const price = item.price || item.amount; // use whichever field your products have

  const matchesCategory =
    selectedCategory === "All" ||
    (item.category === selectedCategory &&
      (!selectedSubcategory || item.shop === selectedSubcategory));

  const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesPrice = price <= maxPrice;

  // ✅ new check for sortRange
  const matchesSortRange =
    !sortRange ||
    (price >= sortRange[0] &&
      (sortRange[1] === Infinity || price <= sortRange[1]));

  return matchesCategory && matchesSearch && matchesPrice && matchesSortRange;
});


// ✅ Apply price sorting range
if (sortRange) {
  filtered = filtered.filter(
    (p) =>
      (p.price || p.amount) >= sortRange[0] &&
      (sortRange[1] === Infinity || (p.price || p.amount) <= sortRange[1])
  );
}


  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubcategory, searchTerm, maxPrice]);

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  

  return (
    <div className="min-h-screen lg:flex lg:gap-8 max-w-full mt-[2rem] lg:mt-[6rem] mx-auto lg:px-6 lg:py-0 py-10">
      <div className="hidden lg:block w-80 flex-shrink-0 sticky top-24 h-[calc(100vh-6rem)] border-r border-gray-200 pr-6 overflow-y-auto">
        <Filters
          subcategories={subcategories}
          selectedSubcategory={selectedSubcategory}
          setSelectedSubcategory={setSelectedSubcategory}
          sortRange={sortRange}
          setSortRange={setSortRange}
        />
      </div>
      <Toaster position="top-right" />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Section */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-center mb-4 quando-regular">
              🛍️ {selectedCategory} Store
            </h1>
            <div className="md:hidden w-full px-4">
              <Filters
                subcategories={subcategories}
                selectedSubcategory={selectedSubcategory}
                setSelectedSubcategory={setSelectedSubcategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sortRange={sortRange}             
                setSortRange={setSortRange}      
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {paginatedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-semibold text-gray-700 mb-2">No matching products.</p>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-6 px-2 md:gap-6 mb-8">
            {paginatedProducts.map((item) => {
              const wished = isInWishlist(item.slug);
              const itemPrice = item.price || item.amount;
              const itemOriginalPrice = item.originalPrice;
              const hasDiscount = itemOriginalPrice && itemOriginalPrice > itemPrice;
              
              return (
                <div
                  key={item.slug}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 hover:border-purple-300"
                >
                  {/* Product Image Container */}
                  <div className="relative bg-gray-50 overflow-hidden">
                    <img
                      src={item.image || item.img}
                      alt={item.title}
                      className="w-full h-48 md:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Discount Badge */}
                    {hasDiscount && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                        {Math.round(((itemOriginalPrice - itemPrice) / itemOriginalPrice) * 100)}% OFF
                      </div>
                    )}
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={() => {
                        toggleWishlist(item);
                        toast.success(`${wished ? "Removed from" : "Added to"} Wishlist: ${item.title}`);
                      }}
                      className={`absolute top-3 right-3 w-5 h-5 md:w-10 md:h-10 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 ${
                        wished ? "text-red-500" : "text-gray-400 hover:text-red-500"
                      }`}
                      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {wished ? "❤️" : "🤍"}
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="md:p-4 p-2 flex flex-col flex-grow">
                    <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 md:mb-3">
                      {item.title}
                    </h3>
                    
                    {/* Price Section */}
                    <div className="mt-auto space-y-1 mb-3">
                      <div className="flex items-baseline gap-2">
                        <p className="text-lg md:text-xl font-bold text-purple-700">
                          ₹{itemPrice}
                        </p>
                        {hasDiscount && (
                          <p className="text-sm text-gray-400 line-through">
                            ₹{itemOriginalPrice}
                          </p>
                        )}
                      </div>
                      {item.delivery && (
                        <p className="text-xs text-green-600 font-medium">
                          🚚 {item.delivery}
                        </p>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => {
                        addToCart(item);
                        toast.success(`${item.title} added to cart!`);
                      }}
                      className="w-full py-1.5 md:py-2.5 bg-white border-2 border-purple-600 hover:bg-purple-600 hover:text-white text-purple-600 font-semibold rounded-xl transition-all duration-300 text-sm md:text-base shadow-sm hover:shadow-md"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-purple-100 hover:bg-purple-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-purple-700 font-semibold rounded-lg transition-all duration-300"
              >
                ← Previous
              </button>
              <div className="flex gap-1">
                {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = idx + 1;
                  } else if (currentPage <= 3) {
                    pageNum = idx + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + idx;
                  } else {
                    pageNum = currentPage - 2 + idx;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                        currentPage === pageNum
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-gray-100 hover:bg-purple-100 text-gray-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-purple-100 hover:bg-purple-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-purple-700 font-semibold rounded-lg transition-all duration-300"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
