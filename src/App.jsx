import { Toaster } from "react-hot-toast"; // ✅
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AppLayout from './components/AppLayout';

import HomePage from './components/HomePage';
import Wishlist from './components/Wishlist';
import Store from './components/Store';
import Cart from './components/Cart';
import ProductDetailPage from './pages/ProductDetailPage';
import RedirectToStoreWithFilters from './components/RedirectToStoreWithFilters';
import OccasionShop from './pages/OccasionShop';
import Login from './pages/Login';
import Signup from './pages/Signup';


export default function App() {
  const location = useLocation();
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Add here */}
      <Routes>
        {isAuthPage ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        ) : (
          <Route
            path="*"
            element={
              <AppLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/product/:slug" element={<ProductDetailPage />} />
                  <Route path="/store/:slug" element={<RedirectToStoreWithFilters />} />
                  <Route path="/shop/:name" element={<OccasionShop />} />
                </Routes>
              </AppLayout>
            }
          />
        )}
      </Routes>
    </>
  );
}
