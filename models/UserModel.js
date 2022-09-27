const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    lastLogin: { type: String, default: null },
    created: { type: String, default: Date.now },
    banned: { type: Boolean, default: false },
    password: { type: String, require: true },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);
module.exports = model;
