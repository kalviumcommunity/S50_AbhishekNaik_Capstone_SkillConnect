const { validationResult } = require("express-validator");
const User = require("../models/User");
const Profile = require("../models/ProfileDetails");
const bcrypt = require("bcrypt");
const SaltRounds = process.env.BCRYPT_SALT_ROUNDS;
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send("500-Server Error");
  }
};
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send("500-Server Error");
  }
};

exports.createUser = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      parseInt(SaltRounds),
    );

    console.log(req.body);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const result = await user.save();
    res.send(result);
  } catch (error) {
    console.log("Error during user creation:", error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email or name already exists" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
exports.updateUserById = async (req, res) => {
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
    let profile = await Profile.findOne({ name: user.name });
    if (!profile) {
      profile = new Profile({ name: user.name });
      await profile.save();
    }
    user.profile = profile._id;
    await user.save();
    const token = jwt.sign(
      { username: user.name, email: user.email },
      SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );
    res.cookie("name", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });
    res.json({ message: "Login successful", user, token });
    console.log("Login successful", user, token);
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
