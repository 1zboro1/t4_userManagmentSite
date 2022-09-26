const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/UserModel.js");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/task4-database");

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  const time = new Date().toLocaleString();
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      lastLogin: null,
      created: time,
      banned: false,
      password: req.body.password,
      checkbox: false,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
    banned: false,
  });

  if (user) {
    const token = jwt.sign(
      {
        email: user.email,
        password: user.password,
        banned: false,
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
    const time = new Date().toLocaleString();
    await User.updateOne({ email: email }, { $set: { lastLogin: time } });
    return { status: "ok", name: User.name };
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "invaild token" });
  }
});

app.get("/api/getUsers", (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/api/deleteUser", (req, res) => {
  const userList = req.body.checkedUsers;
  console.log(userList);
  var myquery = { _id: { $in: userList } };
  User.deleteMany(myquery, function (err, result) {
    if (err) console.log(err);
    else {
      console.log(res.json(result));
    }
  });
});

app.post("/api/blockUser", (req, res) => {
  const userList = req.body.checkedUsers;
  console.log(userList);
  var myquery = { _id: { $in: userList } };
  User.deleteMany(myquery, function (err, result) {
    if (err) console.log(err);
    else {
      console.log(res.json(result));
    }
  });
});

app.post("/api/unblockUser", (req, res) => {
  const userList = req.body.checkedUsers;
  console.log(userList);
  var myquery = { _id: { $in: userList } };
  User.deleteMany(myquery, function (err, result) {
    if (err) console.log(err);
    else {
      console.log(res.json(result));
    }
  });
});

app.listen(1337, () => {
  console.log("Server running on port 1337");
});
