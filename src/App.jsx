import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

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
import SearchResults from './pages/SearchResults';

export default function App() {
  const location = useLocation();

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Auth routes (no layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* App routes with layout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/store/:slug" element={<RedirectToStoreWithFilters />} />
          <Route path="/shop/:name" element={<OccasionShop />} />
          <Route path="/search" element={<SearchResults />} />
        </Route>
      </Routes>
    </>
  );
}


























































// Developer - Arpit Shukla