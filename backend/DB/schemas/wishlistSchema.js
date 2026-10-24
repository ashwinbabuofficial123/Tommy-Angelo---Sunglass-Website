const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  updatedAt: Date,
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
