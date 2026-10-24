const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  addressLine1: { type: String, required: true },

  addressLine2: String,

  city: { type: String, required: true },

  state: { type: String, required: true },

  postalCode: Number,

  country: {
    type: String,
  },

  addressType: {
    type: String,
    enum: ["Home", "Work", "Other"],
    default: "Home",
  },

  isDefault: {
    type: Boolean,
    default: true,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
