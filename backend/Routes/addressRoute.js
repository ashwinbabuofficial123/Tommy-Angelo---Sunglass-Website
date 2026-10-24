const express = require("express");
const Address = require("../DB/schemas/addressSchema");
const authToken = require("../Middleware/authMiddleware");
const router = express.Router();

// GET ALL ADDRESS FOR ADMIN
router.get("/address/all", authToken(["Admin"]), async (req, res) => {
  try {
    const address = await Address.findOne();

    res.status(200).json({
      message: "Address Getting",
      address: address,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});
// GET ONLY USERS ADDRESS
router.get("/address", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.user;

    const address = await Address.find({ userId: id });

    res.status(200).json({
      message: "Address Getting",
      address,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// ADD ADRRESS
router.post("/address", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.user;
    const address = await Address.create({ userId: id, ...req.body });
    res.status(201).json({ message: "Address Added", address });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});
// UPDATE ADDRESS
router.put("/address/:id", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.user;
    const address = await Address.findByIdAndUpdate({
      userId: id,
      ...req.body,
    });
    res.status(201).json({ message: "" });
  } catch (error) {}
});
// DELETE ADDRESS
router.delete("/address/:id", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.params;
    await Address.findByIdAndDelete(id);
    res.status(200).json({ message: "Address Deleted" });
  } catch (error) {
    res.status(401).json({ message: error });
  }
});
module.exports = router;
