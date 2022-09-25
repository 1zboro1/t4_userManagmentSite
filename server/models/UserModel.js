const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    lastLogin: { type: Date, default: null },
    created: { type: Date, default: Date.now },
    banned: { type: Boolean, default: false },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);
module.exports = model;
