import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Wishlist from './components/Wishlist';
import Store from './components/Store';
import Cart from './components/Cart';
import Nav from './components/Nav';
import ProductDetailPage from './pages/ProductDetailPage';
import RedirectToStoreWithFilters from './components/RedirectToStoreWithFilters';
import OccasionShop from './pages/OccasionShop';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FloatingButtons from './components/FloatingButtons'; // ✅ Import

export default function App() {
  return (
    <>
      <Nav />
      <FloatingButtons /> {/* ✅ Visible on every page */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/store/:slug" element={<RedirectToStoreWithFilters />} />
        <Route path="/shop/:name" element={<OccasionShop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
