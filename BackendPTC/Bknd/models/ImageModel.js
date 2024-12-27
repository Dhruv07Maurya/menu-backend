const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  type: String,
  url: String,
});
module.exports = mongoose.model("Image", imageSchema);
