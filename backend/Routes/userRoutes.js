const express = require("express");
const User = require("../DB/schemas/userSchema");
const authToken = require("../Middleware/authMiddleware");

const router = express.Router();

// ALL USER GET BY ADMIN
router.get("/users", async (req, res) => {
  try {
    const user = await User.find().select("-password");
    res.status(200).json({ message: "UserGetting", user });
  } catch (error) {
    res.status(400).json(error);
  }
});

//GET USERS ID
router.get("/user", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    res.status(200).json("User Getting");
  } catch (error) {
    res.status(400).json(error);
  }
});

// UPDATE USERS ID
router.patch("/user/:id", authToken(["User"]), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "Account Updated ✅", user });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// DELETE USER'S ACCOUNT BY ADMIN
router.delete("/user/:id", authToken(["Admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Accout Deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
module.exports = router;
