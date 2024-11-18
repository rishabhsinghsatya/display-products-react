import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, onViewDetails }) => {
  return (
    <div className="product-card">
      <img
        src={product.image || "placeholder.jpg"}
        alt={product.name}
        className="product-card-image"
      />
      <h3 className="product-card-title">{product.name}</h3>
      <p className="product-card-variety">{product.variety}</p>
      <p className="product-card-price">₹{product.price}</p>
      <button
        className="product-card-button"
        onClick={() => onViewDetails(product)}
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
