const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Array to store products
let products = [];

// Generate random products
function generateRandomProducts() {
  const names = [
    "Product1",
    "Product2",
    "Product3",
    "Product4",
    "Product5",
    "Product6",
    "Product7",
    "Product8",
    "Product9",
    "Product10",
  ];

  for (let i = 1; i <= 10; i++) {
    const product = {
      id: i,
      name: names[i - 1],
      price: Math.floor(Math.random() * 100) + 1,
      quantity: Math.floor(Math.random() * 10) + 1,
    };

    products.push(product);
  }
}

generateRandomProducts();

// GET request handler to return the entire array of products
app.get("/products", (req, res) => {
  res.json(products);
});

// GET request handler to return a specific product based on ID
app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// GET request handler to implement pagination with count and offset parameters
app.get("/products/page", (req, res) => {
  const count = parseInt(req.query.count) || 10;
  const offset = parseInt(req.query.offset) || 0;

  const paginatedProducts = products.slice(offset, offset + count);

  res.json(paginatedProducts);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
