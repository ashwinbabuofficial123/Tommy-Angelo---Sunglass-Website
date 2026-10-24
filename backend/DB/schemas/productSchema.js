const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    size: {
      type: [String],
      enum: ["Small", "Medium", "Large", "Free-Size"],
      require: true,
    },
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
    },

    images: [String],

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
    },
    discountPercentage: String,
    shortDescription: String,
    description: [String],
    features: [String],
    frameColor: String,
    frameMaterial: String,
    lensMaterial: String,
    lensSize: String,
    lensColor: String,

    frameShape: String,
    model3d: String,
    stock: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },
    review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
