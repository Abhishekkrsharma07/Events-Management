const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  time: String,
  location: String,
  price: Number,

  // ✅ REQUIRED FOR IMAGE
  image: String,

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Event", EventSchema);