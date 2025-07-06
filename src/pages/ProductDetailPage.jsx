import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useCart } from "../components/CartContext";
import toast from "react-hot-toast";

// 🧪 Mock data for instant render
const mockProduct = {
  slug: "sample-product",
  title: "Chocolate Surprise Box",
  price: 499,
  originalPrice: 699,
  delivery: "Same Day Delivery",
  description:
    "A delightful surprise box filled with premium chocolates. Perfect for birthdays, anniversaries, and sweet moments.",
  image:
    "https://images.unsplash.com/photo-1606312619344-07e99e93d2e4?auto=format&fit=crop&w=600&q=80",
  userImages: [
    "https://images.unsplash.com/photo-1613131227245-3b567b5f5b6a?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=60",
  ],
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(mockProduct);
  const [userImages, setUserImages] = useState(mockProduct.userImages);
  const [loading, setLoading] = useState(true);
  const location = useLocation()

   useEffect(() => {
    // Scroll to top whenever location changes (i.e., new category/shop)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  
  // ⏳ Simulate backend fetch
  useEffect(() => {
    async function fetchProduct() {
      try {
        await new Promise((res) => setTimeout(res, 2000)); // simulate delay
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setProduct(data);
        setUserImages(data.userImages || []);
      } catch (err) {
        console.warn("Fallback to mock product due to error:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  // ✅ Add to Cart with toast
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart! 🛒`);
  };

   const handleCheckout = () => {
    window.location.href = "https://razorpay.me/@socialoffer";
  }

  // ✅ Image Upload + Preview
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    toast.loading("Uploading image...", { id: "upload-toast" });

    try {
      // Simulate upload delay
      await new Promise((res) => setTimeout(res, 1500));
      const localPreviewURL = URL.createObjectURL(file);

      setUserImages((prev) => [...prev, localPreviewURL]);
      toast.success("Image uploaded!", { id: "upload-toast" });
    } catch (err) {
      toast.error("Upload failed!", { id: "upload-toast" });
    }
  };

  if (!product) {
    return <p className="text-center mt-32 text-gray-500">Product not found.</p>;
  }

  return (
    <div className="max-w-6xl mt-[5rem] mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        {product.title}
      </h1>

      <div className="grid md:grid-cols-2 gap-12 bg-white p-6 md:p-10 rounded-3xl shadow-lg">
        {/* Left Section */}
        <div className="space-y-4">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.title}
            className="w-full h-[22rem] object-cover rounded-xl shadow"
          />

          {/* Upload Section */}
          {/* <div className="bg-gray-100 p-4 rounded-xl">
            <label className="block text-sm font-medium mb-2">
              your reviews
            </label>
            <input
              type="text"
              placeholder="your reviews"
              accept="text"
              onChange={handleImageUpload}
              className="block w-full text-sm file:bg-purple-600 file:text-white file:px-4 file:py-2 file:rounded file:cursor-pointer"
            />
          </div> */}
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <p className="text-3xl font-bold text-green-700">₹ {product.price}</p>
          {product.originalPrice && (
            <p className="text-gray-500 line-through">
              ₹ {product.originalPrice}
            </p>
          )}

          <p className="text-gray-700">
            <strong>Delivery:</strong> {product.delivery || "N/A"}
          </p>

          <p className="text-gray-600">
            {product.description || "No description available."}
          </p>

        <div className="w-full">
          <input
            type="text"
            placeholder="Any special message for loved ones ?"
            className="w-full p-4 border-2 border-purple-300 rounded-3xl shadow-md 
                       focus:outline-none focus:border-purple-500 
                       transition-all duration-300 ease-in-out"
          />
        </div>
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 hover:cursor-pointer transition-all text-white rounded-full shadow-md"
          >
            Add to Cart
          </button>
          <button
            onClick={handleCheckout}
            className="px-6 py-3 mx-5 bg-green-500 hover:bg-green-700 hover:cursor-pointer transition-all text-white rounded-full shadow-md"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Customer Uploaded Images */}
      {/* {userImages.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold mb-4">
            Customer Uploaded Photos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Uploaded ${index + 1}`}
                className="h-40 w-full object-cover rounded-lg shadow"
              />
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-6 text-center text-sm text-gray-500 animate-pulse">
          Fetching latest product info...
        </div>
      )} */}
    </div>
  );
}
