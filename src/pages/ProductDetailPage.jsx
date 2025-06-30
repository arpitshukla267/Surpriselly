import React from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../components/ProductContext";
import { useCart } from "../components/CartContext"; // ✅ import useCart
import toast from "react-hot-toast"; // ✅ optional for user feedback

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { getProductBySlug } = useProduct();
  const { addToCart } = useCart(); // ✅ use cart context
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <p className="text-center mt-32 text-gray-500">Product not found.</p>
    );
  }

  const handleAddToCart = () => {
    addToCart(product); // ✅ add the product to cart
    toast.success(`${product.title} added to cart!`); // ✅ feedback (optional)
  };

  return (
    <div className="max-w-6xl mt-[15rem] mx-auto px-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-10">{product.title}</h1>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-start gap-8 bg-white shadow-xl rounded-2xl p-6">
        {/* Image Section */}
        <div className="md:w-1/2 w-full">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.title}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        {/* Product Info Section */}
        <div className="md:w-1/2 w-full space-y-4">
          <p className="text-2xl font-semibold text-green-700">
            ₹ {product.price}
          </p>

          {product.originalPrice && (
            <p className="text-gray-500 line-through">
              ₹ {product.originalPrice}
            </p>
          )}

          <p className="text-gray-700 text-sm">
            <span className="font-medium">Delivery:</span>{" "}
            {product.delivery || "N/A"}
          </p>

          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            efficitur, nunc in cursus cursus, purus arcu faucibus risus, sed
            fermentum magna quam ac odio.
          </p>

          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 transition-all text-white rounded-full shadow"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
