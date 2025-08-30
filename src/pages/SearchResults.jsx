import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useProduct } from "../components/ProductContext";

export default function SearchResults() {
  const { allProducts } = useProduct();
  const query = new URLSearchParams(useLocation().search).get("q") || "";

  const results = allProducts.filter((item) =>
    (item.name || item.title || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="md:p-6 px-3 md:max-w-6xl mx-auto mt-[5rem]">
      <h2 className="text-2xl font-bold mb-4 px-2">
        Search Results for "{query}" ({results.length})
      </h2>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((item) => (
            <Link
              key={item.slug}
              to={`/product/${item.slug}`}
              className="rounded-lg p-3 shadow-md hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="font-semibold mt-2">{item.name || item.title}</h3>
              <p className="text-green-600 font-bold">₹{item.price || item.amount}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
