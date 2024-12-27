const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const users = require("./models/UserModel");
const food = require("./models/FoodModel");
mongoose
  .connect(
    "mongodb+srv://2022dhruvmaurya:4nPzjRAivs9hw2S4@cluster1.rattm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("/ route");
});

const loginRouter = require("./Routes/login");
app.use("/login", loginRouter);

const signupRouter = require("./Routes/signup");
app.use("/signup", signupRouter);

const dashRouter = require("./Routes/dashboard");
app.use("/dashboard", dashRouter);

app.listen(3000, () => {
  console.log("app is running");
});
