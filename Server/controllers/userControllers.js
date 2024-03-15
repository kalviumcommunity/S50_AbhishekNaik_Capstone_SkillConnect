const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const SaltRounds = process.env.BCRYPT_SALT_ROUNDS;
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send("500-Server Error");
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send("500-Server Error");
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      parseInt(SaltRounds)
    );

    console.log(req.body)
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const result = await user.save();
    res.send(result);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send("404-User not found");
    }
    res.send(deletedUser);
  } catch (error) {
    res.status(500).send("500-Server Error");
  }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send("404-User not found");
    }
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send("500-Server Error");
  }
};

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // If username and password are valid, generate JWT
    const token = jwt.sign({ username: user.name, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Set the JWT as a secure and HTTP only cookie in the response
    res.cookie("name", token, {
      httpOnly: true,
      secure: true, // set to true if your application is served over HTTPS
      maxAge: 3600000,
    });

    // Send the token in the response body
    res.json({ message: "Login successful", user, token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};