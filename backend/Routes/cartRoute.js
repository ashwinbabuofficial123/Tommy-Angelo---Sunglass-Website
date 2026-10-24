const express = require("express");
const Cart = require("../DB/schemas/cartSchema");
const authToken = require("../Middleware/authMiddleware");
const router = express.Router();

// CART BY USER's
router.get("/cart", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.find({ userId: id }).populate("items.productId");
    res.status(200).json({ message: "cart Getting", cart });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// ADD TO CART
router.post("/cart", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.create({ userId: id, ...req.body });
    res.status(201).json({ message: "Added To Cart ✅️", cart });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// UPDATE CART
router.patch("/cart/:id", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "cart Updated", cart });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// DELETE CART
router.delete("/cart/:id", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findByIdAndDelete(id, { new: true });
    res.status(200).json({ message: "cart Updated", cart });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
