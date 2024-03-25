const { validationResult, header } = require("express-validator");
const User = require("../models/User");
const Profile = require("../models/ProfileDetails");
const bcrypt = require("bcrypt");
const SaltRounds = process.env.BCRYPT_SALT_ROUNDS;
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("profile").exec();
    res.send(users);
  } catch (error) {
    res.status(500).send("500-Server Error");
  }
};
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params._id).populate("profile").exec();
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

    // console.log(req.body);
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
    const user = await User.findOne({ name }).populate("profile").exec();
    // console.log("user", user);
    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    let profile = await Profile.findOne({ name: user.name })
      .populate("posts")
      .exec();
    // console.log("profile", profile);

    if (!profile) {
      try {
        profile = new Profile({ name: user.name, email: user.email });
        profile.picture = `https://api.dicebear.com/8.x/initials/svg?seed=${user.name}&backgroundType=gradientLinear,solid&backgroundRotation=0,360`;
        await profile.save();
        user.profile = profile._id;
        await user.save();
      } catch (profileErr) {
        console.error("Error creating profile:", profileErr);
        return res.status(500).json({ error: "Profile creation failed" });
      }
    }

    const token = jwt.sign(
      { username: user.name, email: user.email },
      SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );
    res.cookie("name", token, {
      httpOnly: true,
      // secure: true,
      maxAge: 3600000,
    });
    // console.log("use", token);
    res.json({ message: "Login successful", user, token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.logoutUser = async (req, res) => {
  console.log("coming");
  res.clearCookie("name", { httpOnly: true });
  res.json({ message: "Logout successful" });
};

exports.getSingleUser = async (req, res) => {
  // console.log("kk", req.cookies);
  const { name } = req.cookies;
  // console.log("name", name);

  try {
    const payload = jwt.verify(name, SECRET_KEY);
    // console.log("payload", payload);

    const loginUser = await User.findOne({ name: payload.username })
      .populate({ path: "profile", populate: { path: "posts" } })
      .exec();

    if (!loginUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: loginUser });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
