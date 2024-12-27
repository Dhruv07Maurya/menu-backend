const mongoose = require("mongoose");
const FoodSchema = new mongoose.Schema({
  food: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  Uid: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Food", FoodSchema);
