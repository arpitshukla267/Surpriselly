"use client";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // for CRA/react-router
import { useProduct } from "../components/ProductContext"; // your context
import { useCart } from "../components/CartContext"; // your cart context
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { slug } = useParams(); // get slug from URL
  const navigate = useNavigate();
  const { getProductBySlug } = useProduct();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load product from context
  useEffect(() => {
    const p = getProductBySlug(slug);
    if (p) {
      setProduct(p);
      setLoading(false);
    } else {
      // Optional: Fetch from backend if not in context
      const fetchProduct = async () => {
        try {
          const res = await fetch(`/api/products/${slug}`);
          if (!res.ok) throw new Error("Product not found");
          const data = await res.json();
          setProduct(data);
        } catch (err) {
          toast.error("Product not found");
          navigate("/"); // redirect to home/store if slug invalid
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [slug, getProductBySlug, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  if (loading) {
    return <div className="text-center py-32 text-gray-500 animate-pulse">Loading product...</div>;
  }

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart! 🛒`);
  };

  const handleBuyNow = () => {
    window.location.href = "https://razorpay.me/@socialoffer"; // or your checkout URL
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">{product.title}</h1>

      <div className="grid md:grid-cols-2 gap-12 bg-white p-6 md:p-10 rounded-3xl shadow-lg">
        {/* Left - Product Image */}
        <div className="flex-1">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl shadow"
          />
        </div>

        {/* Right - Product Details */}
        <div className="flex-1 space-y-6 justify-center items-center">
          <p className="text-3xl font-bold text-green-700">₹ {product.price}</p>
          {product.originalPrice && (
            <p className="text-gray-500 line-through">₹ {product.originalPrice}</p>
          )}
          <p className="text-gray-700">
            <strong>Delivery:</strong> {product.delivery || "N/A"}
          </p>
          <p className="text-gray-600">{product.description || "No description available."}</p>

          <input
            type="text"
            placeholder="Any special message for loved ones?"
            className="w-full p-4 border-2 border-purple-300 rounded-3xl shadow-md focus:outline-none focus:border-purple-500 transition-all duration-300"
          />

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-md transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-6 py-3 bg-green-500 hover:bg-green-700 text-white rounded-full shadow-md transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
