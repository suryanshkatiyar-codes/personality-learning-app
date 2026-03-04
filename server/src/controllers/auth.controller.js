const mongoose = require('mongoose');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {

  try {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
      $or: [
        { email },
        { username }
      ]
    })

    if (user) {
      return res.status(401).json({ message: "User already exists" })
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hash,
    })

    const token = jwt.sign({
      id: newUser._id,
    }, process.env.JWT_SECRET,
      { expiresIn: '7d' })

    // This prevents js from accessing the token
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", err: err });
  }
}

async function loginUser(req, res) {



  try {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({
      $or: [
        { username },
        { email }
      ]
    })
    if (!user) {
      return res.status(401).json({ message: "User does not exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({
      id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: '7d' })

    // This prevents js from accessing the token
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    })

  } catch (err) {
    return res.status(500).json({ message: "Server error" })
  }
}

module.exports = { registerUser, loginUser };