const express = require("express");
const Router = express.Router();
const User = require("../module&schema/module.schema");
const bcrypt = require("bcryptjs");
const generate = require("../utils/utils.index");
const verifiedToken = require("../middleware/middleware.index");
const { decrypt } = require("dotenv");

// localhost:3500/api/user
Router.post("/user", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email: email });
    if (!user.length) {
      const hasedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hasedPassword });
      await newUser.save();
      res.status(201).json({
        message: "User Created",
        fields: newUser,
      });
    } else {
      res.json({
        message: "User already Exists",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

// localhost:3500/api/authenticate
Router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email });
    if (!user.length) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
    const token = generate(user);
    res.json({
      token,
    });
  } catch (err) {
    console.log(err.message);
  }
});

// localhost:3500/api/data
Router.get("/data", verifiedToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}! This is protected data` });
});

// localhost:3500/api/reset-password
Router.post("/reset-password", async (req, res) => {
  const { email } = req.body;
  try {
    const token = Math.random().toString(36).slice(-8);
    await User.updateMany({ email }, { $set: { token } });
    const user = await User.find({ email });
    if (!user.length) return res.json({ message: "User Not Found" });

    res.json({ token });
  } catch (err) {
    console.log(err.message);
  }
});

// localhost:3500/api/reset-password/:token
Router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.find({ token });

    if (!user.length) return res.json({ message: "Invalid Token" });
    const hash = await bcrypt.hash(password, 10);
    await User.updateMany({ token }, { $set: { password: hash } });

    res.json({ message: "Password reset Successfully" });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = Router;
