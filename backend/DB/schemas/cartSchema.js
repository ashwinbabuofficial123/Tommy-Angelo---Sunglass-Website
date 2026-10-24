const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        size: { type: String, required: true },
        quantity: {
          type: Number,
          default: 1,
        },

        price: { type: Number, default: 0 },
      },
    ],
    total: { type: Number, default: 0 },

    updatedAt: Date,
  },
  { timestamps: true },
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
