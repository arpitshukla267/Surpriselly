import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

export default function FloatingButtons() {
  const { pathname } = useLocation();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const wishlistCount = wishlist.length;

  const hideOnRoutes = ["/login", "/signup"];
  if (hideOnRoutes.includes(pathname)) return null;

  return (
    <>
      {/* Wishlist Button - Bottom Left */}
      {/* <div className="md:hidden fixed bottom-6 left-5 z-50">
        <Link
          to="/wishlist"
          className="relative w-14 h-14 flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg transition duration-300"
        >
          <FaHeart size={20} />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 text-[12px] bg-white text-pink-600 rounded-full h-7 w-7 grid place-content-center font-bold shadow-sm">
              {wishlistCount}
            </span>
          )}
        </Link>
      </div>

      {/* Cart Button - Bottom Right 
      <div className="md:hidden fixed bottom-6 right-5 z-50">
        <Link
          to="/cart"
          className="relative w-14 h-14 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition duration-300"
        >
          <FaShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 text-[12px] bg-white text-purple-700 rounded-full h-7 w-7 grid place-content-center font-bold shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>
      </div> */}
    </>
  );
}
