import React from "react";
import "./ProductDetails.css";

const ProductDetails = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="product-details">
      <div className="product-details-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>{product.name}</h2>
        <img
          src={product.image || "placeholder.jpg"}
          alt={product.name}
          className="product-details-image"
        />
        <p>
          <strong>Variety:</strong> {product.variety}
        </p>
        <p>
          <strong>Price:</strong> ₹{product.price}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <div>
          <h3>Reviews:</h3>
          <ul className="product-details-reviews">
            {product.reviews.map((review, index) => (
              <li key={index}>
                <strong>{review.user}</strong>: {review.comment} (
                <span>Rating: {review.rating}</span>)
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
