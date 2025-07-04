import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ShopProvider } from "./components/ShopContext";
import { CartProvider } from "./components/CartContext";
import { WishlistProvider } from "./components/WishlistContext";
import { ProductProvider } from "./components/ProductContext"; // ✅ import this
import "./index.css"; // ✅ import your CSS file

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopProvider>
        <CartProvider>
          <WishlistProvider>
            <ProductProvider> {/* ✅ wrap your App inside */}
              <App />
            </ProductProvider>
          </WishlistProvider>
        </CartProvider>
      </ShopProvider>
    </BrowserRouter>
  </React.StrictMode>
);
