import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProduct } from "./ProductContext";

// Sample luxury items data
const luxuryItems = [
  {
    title: "Gold Roses Box",
    slug: "gold-roses-box",
    image: "https://i.pinimg.com/736x/45/50/33/455033116628fa550fff3e7596634104.jpg",
    price: 4999,
    category: "Luxury Collection",
    delivery: "Tomorrow",
    amount: 4999,
  },
  {
    title: "Swarovski Crystal Bear",
    slug: "swarovski-crystal-bear",
    image: "https://i.pinimg.com/736x/35/54/6d/35546d444046e38312536a3f682e865a.jpg",
    price: 6999,
    category: "Luxury Collection",
    delivery: "Tomorrow",
    amount: 6999,
  },
  {
    title: "Luxury Chocolate Tower",
    slug: "luxury-chocolate-tower",
    image: "https://i.pinimg.com/1200x/d1/ec/38/d1ec388a1e064806f29ec9cdee12ffc7.jpg",
    price: 2999,
    category: "Luxury Collection",
    delivery: "Tomorrow",
    amount: 2999,
  },
  {
    title: "Velvet Perfume Set",
    slug: "velvet-perfume-set",
    image: "https://i.pinimg.com/736x/0a/ba/d6/0abad6ebf0ae1c52b619a14ba109cccb.jpg",
    price: 3999,
    category: "Luxury Collection",
    delivery: "Tomorrow",
    amount: 3999,
  },
  {
    title: "Marble Decor Vase",
    slug: "marble-decor-vase",
    image: "https://i.pinimg.com/1200x/01/ac/d7/01acd7e96b2f34e563c3e571729106b6.jpg",
    price: 2599,
    category: "Luxury Collection",
    delivery: "Tomorrow",
    amount: 2599,
  },
];

export default function LuxuryItems() {
  const { addProducts } = useProduct();

  // Add luxury items to ProductContext for direct URL access
  useEffect(() => {
    addProducts(luxuryItems);
  }, []);

  return (
    <div className="px-0 md:px-4 py-8 bg-gradient-to-br from-purple-600 to-purple-400">
      <h2
        className="lg:text-4xl text-2xl text-white ml-3 mb-4 quando-regular"
        style={{ textShadow: "1px 1px 2px #7669c1" }}
      >
        Luxury Collection
      </h2>

      <div className="flex space-x-3 overflow-x-auto pb-4 mx-3 scrollbar-hide">
        {luxuryItems.map((item) => (
          <Link
            key={item.slug}
            to={`/product/${item.slug}`}
            state={{ product: item }} // pass product via Link state
            className="w-[200px] md:min-w-[240px] bg-white rounded-2xl shadow-xl md:mt-4 hover:scale-105 transform transition duration-300 p-4 flex-shrink-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-xl mb-2"
            />
            <div className="text-center">
              <h3 className="font-semibold lg:text-lg text-sm text-gray-900 text-left">{item.title}</h3>
              <p className="text-green-700 lg:font-bold font-semibold text-left mt-1">₹ {item.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
