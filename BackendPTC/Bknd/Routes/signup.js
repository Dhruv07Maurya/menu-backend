const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const users = require("../models/UserModel");

const create = async (email, pass) => {
  try {
    const hash = await bcrypt.hash(pass, 10);
    const newUser = await users.create({
      email,
      password: hash,
    });
    return newUser;
  } catch (err) {
    throw new Error(err.message);
  }
};
router.post("/", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const newUser = await create(email, pass);
    res.status(201).json({
      message: "User signed up successfullxy",
      user: {
        email: newUser.email,
        id: newUser._id,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Error! Cannot signup Email already Exists",
        error: err.message,
      });
  }
});

module.exports = router;
