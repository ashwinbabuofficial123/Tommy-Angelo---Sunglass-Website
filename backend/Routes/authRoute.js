const express = require("express");
const User = require("../DB/schemas/userSchema");
const bcrypt = require("bcrypt");
const jws = require("jsonwebtoken");

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { email, password, confirmpassword } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json("User Already Exist");
    }
    if (password != confirmpassword) {
      return res.status(400).json("Password Doesn't Match");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = { ...req.body, password: hashedPassword };
    const newUser = await User.create(data);

    res.status(201).json("SignUp Success, New User Account Created", newUser);
  } catch (error) {
    console.log(error.messsage);

    res.status(401).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Don't Exists" });
    }
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    const token = jws.sign(
      {
        id: user.id || user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2w" },
    );
    const userObj = user.toObject();
    delete userObj.password;
    console.log(userObj, token);
    return res
      .status(200)
      .json({ userObj, token, message: "loginSuccessfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json(error.messsage);
  }
});

module.exports = router;
