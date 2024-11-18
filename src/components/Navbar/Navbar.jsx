import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ categories, onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategorySelect(category);
  };
  return (
    <nav className="navbar">
      {categories.map((category) => (
        <p
          key={category}
          className={`navbar-button ${
            activeCategory === category ? "active" : ""
          }`} // Add active class if this category is selected
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </p>
      ))}
    </nav>
  );
};

export default Navbar;
