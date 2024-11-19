const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // React app URL
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/productsDB", {
    //   .connect(
    //     "mongodb+srv://vineetsatya36:<db_password>@products-cluster.wjopq.mongodb.net/?retryWrites=true&w=majority&appName=products-Cluster",
    //     {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("🟢 Connected to MongoDB"))
  .catch((err) => console.error("❌ Database connection failed:", err));

// Define Product Schema
const productSchema = new mongoose.Schema({
  category: String,
  products: [
    {
      id: Number,
      name: String,
      variety: String,
      price: Number,
      reviews: [
        {
          user: String,
          rating: Number,
          comment: String,
        },
      ],
      description: String,
      image: String,
    },
  ],
});

// Define Model
const Category = mongoose.model("Category", productSchema);

// API Endpoints
// Fetch the list of products grouped by categories
app.get("/api/products", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
});

// Fetch detailed product information by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const category = await Category.findOne({ "products.id": productId });
    if (!category) {
      return res.status(404).json({ error: "Product not found." });
    }

    const product = category.products.find((prod) => prod.id === productId);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product details." });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🟢 Server is running on http://localhost:${PORT}`);
});
