import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import ProductList from "./components/ProductList/ProductList";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import "./App.css";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch categories from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        const categoriesData = response.data.categories;
        setCategories(categoriesData);
        setSelectedCategory(categoriesData[0]?.category || "");
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get selected products for the selected category
  const selectedProducts = useMemo(
    () =>
      categories.find((cat) => cat.category === selectedCategory)?.products ||
      [],
    [selectedCategory, categories]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="app">
      <Navbar
        categories={categories.map((category) => category.category)}
        onCategorySelect={setSelectedCategory}
      />
      <ProductList
        products={selectedProducts}
        onViewDetails={setSelectedProduct}
      />
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default App;
