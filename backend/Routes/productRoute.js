const express = require("express");
const authToken = require("../Middleware/authMiddleware");
const Product = require("../DB/schemas/productSchema");
const upload = require("../Middleware/multerMiddleware");

const router = express.Router();

// GET ALL PRODUCTS
router.get("/products", async (req, res) => {
  try {
    const {
      category,
      brand,
      gender,
      size,
      frameShape,
      frameMaterial,
      lensColor,
      minPrice,
      maxPrice,
    } = req.query;
    const filters = {};
    if (category) {
      filters.category = category;
    }
    if (brand) {
      filters.brand = brand;
    }
    if (gender) {
      filters.gender = gender;
    }
    if (size) {
      filters.size = size;
    }
    if (frameShape) {
      filters.frameShape = frameShape;
    }
    if (frameMaterial) {
      filters.frameMaterial = frameMaterial;
    }
    if (lensColor) {
      filters.lensColor = lensColor;
    }
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.discountPrice.$gte = Number(minPrice); // greater or equal
      if (maxPrice) filters.discountPrice.$lte = Number(maxPrice); // less or equal
    }
    const product = await Product.find(filters);
    res.status(200).json({ message: "Products Getting", product });
  } catch (error) {
    console.log(error);

    res.status(400).json(error);
  }
});

// GET SIngle Product
router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({ message: "ProductGetting", product });
  } catch (error) {
    console.log(error);
    res.status.json(error);
  }
});
// ADD PRODUCTS
router.post(
  "/product",
  authToken(["Admin"]),
  upload.array("images", 4),
  async (req, res) => {
    try {
      const newData = { ...req.body };
      if (req.files && req.files.length > 0) {
        const imageUrl = req.files.map((file) => {
          return `http://localhost:3000/${file.path}`;
        });
        console.log(imageUrl);
        newData.images = imageUrl;
      }

      const product = await Product.create(newData);
      res.status(201).json({ message: "Product Added", product });
    } catch (error) {
      console.log(error);

      res.status(400).json(error);
    }
  },
);
// Insert Many

// PRODUCT UPDATE
router.put(
  "/product/:id",
  authToken(["Admin"]),
  upload.array("images", 4),
  async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };
      if (req.files && req.files.length > 0) {
        const imageUrl = req.files.map(
          (file) => `http://localhost:3000/${file.path.replace(/\\/g, "/")}`,
        );
        console.log(imageUrl);
        updateData.images = imageUrl;
      }

      const product = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      res.status(200).json({ message: "Product Updated", product });
    } catch (error) {
      console.log(error);

      res.status(400).json(error);
    }
  },
);

// DELETE PRODUCT
router.delete("/product/:id", authToken(["Admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
module.exports = router;
