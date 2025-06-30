import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Wishlist from './components/Wishlist';
import Store from './components/Store';
import Cart from './components/Cart';
import Nav from './components/Nav';
import ProductDetailPage from './pages/ProductDetailPage';

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
      </Routes>
    </>
  );
}
