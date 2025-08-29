import React from "react";
import { Link } from "react-router-dom";

// Sample luxury items data
const luxuryItems = [
  {
    name: "Gold Roses Box",
    image: "https://i.pinimg.com/736x/45/50/33/455033116628fa550fff3e7596634104.jpg",
    slug: "gold-roses-box",
  },
  {
    name: "Swarovski Crystal Bear",
    image: "https://i.pinimg.com/736x/35/54/6d/35546d444046e38312536a3f682e865a.jpg",
    slug: "swarovski-crystal-bear",
  },
  {
    name: "Luxury Chocolate Tower",
    image: "https://i.pinimg.com/1200x/d1/ec/38/d1ec388a1e064806f29ec9cdee12ffc7.jpg",
    slug: "luxury-chocolate-tower",
  },
  {
    name: "Velvet Perfume Set",
    image: "https://i.pinimg.com/736x/0a/ba/d6/0abad6ebf0ae1c52b619a14ba109cccb.jpg",
    slug: "velvet-perfume-set",
  },
  {
    name: "Marble Decor Vase",
    image: "https://i.pinimg.com/1200x/01/ac/d7/01acd7e96b2f34e563c3e571729106b6.jpg",
    slug: "marble-decor-vase",
  },
];

export default function LuxuryItems() {
  return (
    <div className="px-0 md:px-4 py-8 bg-gradient-to-br from-purple-600 to-purple-400">
      <h2 className="text-4xl text-white ml-3 mb-4 quando-regular" style={{ textShadow: '1px 1px 2px #7669c1' }}>Luxury Collection</h2>
      <div className="flex space-x-3 overflow-x-auto pb-4 mx-3 scrollbar-hide">
        {luxuryItems.map((item) => (
          <Link
            to={`/product/${item.slug}`}
            key={item.slug}
            className="w-[200px] md:min-w-[240px] bg-white rounded-2xl shadow-xl md:mt-4 hover:scale-105 transform transition duration-300 p-4 flex-shrink-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-xl mb-2"
            />
            <div className="text-center">
              <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
              {/* <p className="text-pink-600 font-bold">{item.price}</p> */}
            </div>
          </Link>
        ))}
      </div>

      {/* Optional: Hide scrollbar */}
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
