import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import ProductList from "./components/ProductList/ProductList";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import productsData from "./data/products.json";
import "./App.css";

const App = () => {
  const categories = productsData.categories.map((category) => category.category);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const selectedProducts = productsData.categories.find(
    (cat) => cat.category === selectedCategory
  ).products;

  return (
    <div className="app">
      <Navbar
        categories={categories}
        onCategorySelect={setSelectedCategory}
      />
      {/* <h1 className="app-title">{selectedCategory}</h1> */}
      <ProductList
        products={selectedProducts}
        onViewDetails={setSelectedProduct}
      />
      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default App;
