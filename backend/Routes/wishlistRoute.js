const express = require("express");
const authToken = require("../Middleware/authMiddleware");
const Wishlist = require("../DB/schemas/wishlistSchema");
const router = express.Router();

// GET WISHLIST
router.get("/wishlist", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.user;
    const wishlist = await Wishlist.find({ userId: id }).populate("productId");
    res.status(200).json({ message: "Wishlist Getting", wishlist });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});

// ADD TO WISHLIST
router.post("/wishlist", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;

    const wishlist = await Wishlist.create({ userId: id, productId });
    res.status(201).json({ message: "Added to Wishlist ✅️", wishlist });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message || error });
  }
});
// DELETE WISHLIST
router.delete("/wishlist/:id", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.params;
    await Wishlist.findByIdAndDelete(id);
    res.status(201).json({ message: "Deleted from Wishlist ✅️" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});
module.exports = router;
