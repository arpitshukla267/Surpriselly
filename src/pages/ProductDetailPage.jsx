"use client";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../components/ProductContext";
import { useCart } from "../components/CartContext";
import toast from "react-hot-toast";

// Star Rating Component
const StarRating = ({ rating, onRatingChange, interactive = false, size = "text-2xl" }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onRatingChange(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`${size} transition-transform hover:scale-110 ${
            interactive ? "cursor-pointer" : "cursor-default"
          }`}
          disabled={!interactive}
        >
          {star <= (hoverRating || rating) ? "⭐" : "☆"}
        </button>
      ))}
    </div>
  );
};

// Review Component
const ReviewCard = ({ review }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{review.name}</p>
          <p className="text-xs text-gray-500">{review.date}</p>
        </div>
      </div>
      <StarRating rating={review.rating} size="text-lg" />
    </div>
    <p className="text-gray-700 mt-2">{review.comment}</p>
  </div>
);

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getProductBySlug } = useProduct();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "Amazing product! Quality is excellent and delivery was super fast. Highly recommended!",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      rating: 4,
      comment: "Good value for money. The product met my expectations. Packaging could be better though.",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Anjali Patel",
      rating: 5,
      comment: "Perfect gift! My friend loved it. The quality is top-notch and the design is beautiful.",
      date: "2 weeks ago"
    }
  ]);

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  useEffect(() => {
    const p = getProductBySlug(slug);
    if (p) {
      setProduct(p);
      setLoading(false);
    } else {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`/api/products/${slug}`);
          if (!res.ok) throw new Error("Product not found");
          const data = await res.json();
          setProduct(data);
        } catch {
          toast.error("Product not found");
          navigate("/");
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
    return (
      <div className="text-center py-32 text-gray-500 animate-pulse">
        <div className="text-2xl">Loading product...</div>
      </div>
    );
  }

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity}x ${product.title} added to cart! 🛒`);
  };

  const handleBuyNow = () => {
    window.location.href = "https://razorpay.me/@socialoffer";
  };

  const handleSubmitReview = () => {
    if (!reviewerName.trim() || !reviewText.trim() || userRating === 0) {
      toast.error("Please fill all fields and provide a rating");
      return;
    }
    const newReview = {
      id: reviews.length + 1,
      name: reviewerName,
      rating: userRating,
      comment: reviewText,
      date: "Just now"
    };
    setReviews([newReview, ...reviews]);
    setReviewText("");
    setReviewerName("");
    setUserRating(0);
    toast.success("Thank you for your review! 🌟");
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12 py-8 lg:py-16">
      {/* Main Product Section */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-white p-4 md:p-8 lg:p-12 rounded-3xl shadow-xl mb-12">
        {/* Left - Product Image */}
        <div className="flex flex-col gap-4">
          <div className="relative bg-gray-50 rounded-2xl overflow-hidden p-8">
            <img
              src={product.image || product.img || "/placeholder.png"}
              alt={product.title}
              className="w-full h-96 object-contain rounded-xl"
            />
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                {product.discount}
              </div>
            )}
            {discountPercentage > 0 && !product.discount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                {discountPercentage}% OFF
              </div>
            )}
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-purple-600 font-semibold mb-2">
                {product.category || "Product"}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 quando-regular mb-4">
                {product.title}
              </h1>
            </div>

            {/* Rating Display */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <StarRating rating={Math.round(parseFloat(averageRating))} size="text-xl" />
                <span className="text-lg font-semibold text-gray-700">{averageRating}</span>
                <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline gap-4 py-4 border-y border-gray-200">
              <p className="text-4xl font-bold text-green-700">₹{product.price || product.amount}</p>
              {product.originalPrice && (
                <>
                  <p className="text-2xl text-gray-400 line-through">₹{product.originalPrice}</p>
                  <span className="text-green-600 font-semibold">Save ₹{product.originalPrice - product.price}</span>
                </>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="font-semibold">Delivery:</span>
                <span className="text-green-600 font-medium">{product.delivery || "2-3 Business Days"}</span>
              </div>
              {product.shop && (
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="font-semibold">Shop:</span>
                  <span>{product.shop}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-700">Quantity:</span>
              <div className="flex items-center gap-3 border-2 border-purple-300 rounded-full px-4 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-2xl text-purple-600 hover:text-purple-800 font-bold"
                >
                  −
                </button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-2xl text-purple-600 hover:text-purple-800 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Special Message Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Special Message (Optional)
              </label>
              <input
                type="text"
                placeholder="Any special message for loved ones?"
                className="w-full p-4 border-2 border-purple-300 rounded-2xl shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
              >
                ⚡ Buy Now
              </button>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Free Shipping</p>
                <p className="text-sm font-semibold text-gray-700">On orders above ₹500</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">Easy Returns</p>
                <p className="text-sm font-semibold text-gray-700">7 Days Return Policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        
        {/* Average Rating Summary */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <div className="text-5xl font-bold text-purple-700 mb-2">{averageRating}</div>
              <StarRating rating={Math.round(parseFloat(averageRating))} size="text-2xl" />
              <p className="text-gray-600 mt-2">Based on {reviews.length} reviews</p>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter(r => r.rating === star).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm w-12">{star} ⭐</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Write Review Form */}
        <div className="bg-gray-50 p-6 rounded-2xl mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating</label>
              <StarRating
                rating={userRating}
                onRatingChange={setUserRating}
                interactive={true}
                size="text-3xl"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this product..."
                rows="4"
                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500"
              />
            </div>
            <button
              onClick={handleSubmitReview}
              className="w-full sm:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all duration-300"
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">All Reviews ({reviews.length})</h3>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
