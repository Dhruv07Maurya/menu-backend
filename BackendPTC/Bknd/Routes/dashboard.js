const express = require("express");
const router = express.Router();
const fd = require("../models/FoodModel");
const jwt = require("jsonwebtoken");
let id;

const JWT_SECRET = "your-secure-secret";

const verifyTokens = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token Denied" });
  }
};

const add = async (food, desc, email, Uid) => {
  console.log(food, desc, email, Uid);
  try {
    const newFood = await fd.create({
      food,
      desc,
      Uid,
    });
    return newFood;
  } catch (error) {
    console.error(error);
  }
};

router.post("/", verifyTokens, async (req, res) => {
  const { food, desc, email, Uid } = req.body;
  id = Uid;
  await add(food, desc, email, Uid);
  const allFoods = await fd.find({ Uid });
  res.json(allFoods);
});

router.get("/", verifyTokens, async (req, res) => {
  const { Uid } = req.query;
  const allFoods = await fd.find({ Uid });
  res.json(allFoods);
});

module.exports = router;
