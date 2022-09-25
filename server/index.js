const express = require("express");
const app = express();
const cors = require("cors");
const mognoose = require("mongoose");
const { default: mongoose } = require("mongoose");
const User = require("./models/UserModel.js");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/task4-database");

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      lastLogin: null,
      created: Date.now(),
      banned: false,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    name: req.body.name,
    email: req.body.email,
  });

  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }

  res.json({ status: "ok" });
});

app.get("/api/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    return res.json({ status: "ok", name: user.name });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "invaild token" });
  }
});

app.post("/api/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await User.updateOne({ email: email }, { $set: { lastLogin: Date.now() } });
    return { status: "ok", name: user.name };
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "invaild token" });
  }
});

app.listen(1337, () => {
  console.log("Server running on port 1337");
});
