import React, { createContext, useContext, useState, useEffect } from "react";

// import all product arrays
import { page2Products } from "./data/page2Products.js";
import { page7Products } from "./data/page7Products";
import { page8Products } from "./data/page8Products";
import { dummyProducts } from "./data/dummyProducts";
import { occasionProducts } from "./data/occasionProducts";

const ProductContext = createContext();

export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // load once when app starts
    addProducts([
      ...page2Products,
      ...page7Products,
      ...page8Products,
      ...dummyProducts,
      ...occasionProducts,
    ]);
  }, []);

  const addProducts = (newItems = []) => {
    setAllProducts((prev) => {
      const merged = [...prev, ...newItems];
      const unique = Array.from(
        new Map(
          merged.map((item) => [item.slug || item.title, item])
        ).values()
      );
      return unique;
    });
  };

  const getProductBySlug = (slug) =>
    allProducts.find((item) => item.slug === slug);

  return (
    <ProductContext.Provider
      value={{ allProducts, addProducts, getProductBySlug }}
    >
      {children}
    </ProductContext.Provider>
  );
}
