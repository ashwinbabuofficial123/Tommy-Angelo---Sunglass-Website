const express = require("express");
const authToken = require("../Middleware/authMiddleware");
const Order = require("../DB/schemas/orderSchema");
const router = express.Router();

// admin Order
router.get("/allorders", async (req, res) => {
  try {
    const order = await Order.find().populate("items.productId");
    res.status(200).json({ message: "All Orders", order });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/order", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.user;
    const order = await Order.find({ userId: id }).populate("items.productId");
    res.status(200).json({ message: "All Orders", order });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.post("/order", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.user;
    const order = await Order.create({ userId: id, ...req.body });
    res.status(201).json({ message: "Order Confirmed", order });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
// delete sinlgle order
router.delete("/order/:id", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);

    res.status(200).json({ message: "Order Cancelled" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

//clearcart
router.delete("/cart/clear", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.user;
    await Cart.findOneAndUpdate(
      { userId: id },
      { items: [], total: 0 },
      { new: true },
    );
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.patch("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true, runValidators: true }, // return the updated doc
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated", order });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
module.exports = router;
