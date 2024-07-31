const { validationResult, header, cookie } = require("express-validator");
const User = require("../models/User");
const Profile = require("../models/ProfileDetails");
const Posts = require("../models/Post");
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      parseInt(SaltRounds)
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
    const userId = req.params.id; // Ensure you get userId from the request parameters
    const { name, email, bio, description, skills } = req.body;

    // Find user by ID
    const user = await User.findById(userId).populate("profile");
    if (!user) {
      return res.status(404).send("404-User not found");
    }

    // Update user information
    user.name = name;
    user.email = email;
    const updatedUser = await user.save();

    // Update user's profile information
    if (user.profile) {
      user.profile.name = name;
      user.profile.email = email;
      user.profile.bio = bio;
      user.profile.description = description;
      user.profile.skills = skills;
      const updatedProfile = await user.profile.save();

      // Update createdBy field in Posts model
      await Posts.updateMany(
        { createdBy: userId },
        { $set: { createdBy: updatedUser._id } }
      );

      // Generate new token with updated user information
      const token = jwt.sign(
        { name: updatedUser.name, email: updatedUser.email },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      // Set the new token in the cookie
      res.cookie("name", token, {
        httpOnly: true,
        maxAge: 3600000,
      });

      res.json({ user: updatedUser, profile: updatedProfile, token });
    } else {
      return res.status(404).send("404-Profile not found");
    }
  } catch (error) {
    console.error("Error updating user:", error);
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
      return res.status(404).json({ error: "User Not Found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const uid = user.id;
    let profile = await Profile.findOne({ name: user.name })
      .populate("posts")
      .exec();
    // console.log("profile", profile);

    if (!profile) {
      try {
        profile = new Profile({ name: user.name, email: user.email });
        profile.picture = `https://api.dicebear.com/8.x/initials/svg?seed=${user.name}&backgroundType=gradientLinear,solid&backgroundRotation=0,360`;
        profile.bio = "Hello, I am using SkillConnect";
        await profile.save();
        user.profile = profile._id;
        await user.save();
      } catch (profileErr) {
        console.error("Error creating profile:", profileErr);
        return res.status(500).json({ error: "Profile creation failed" });
      }
    }

    const token = jwt.sign({ name: user.name, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("name", token, {
      httpOnly: false,
      // secure: false,
      maxAge: 3600000,
    });
    res.cookie("uid", uid, {
      httpOnly: false,
      // secure: false,
      maxAge: 3600000,
    });
    // request.res.cookie("profileid", profileID, {
    //   httpOnly: false,
    //   // secure: true, // Set to true if using HTTPS
    //   maxAge: 3600000,
    // });
    // console.log("use", token);
    res.json({ message: "Login successful", user, token, uid });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.logoutUser = async (req, res) => {
  // console.log("coming");
  res.clearCookie("name", { httpOnly: false });
  res.json({ message: "Logout successful" });
};

exports.getSingleUser = async (req, res) => {
  const { name } = req.cookies;
  // console.log("name", name);

  try {
    const payload = jwt.verify(name, SECRET_KEY);
    // console.log("payload", payload);

    const loginUser = await Profile.findOne({ name: payload.name })
      .populate({ path: "posts" })
      .exec();
    // console.log("loginUser", loginUser);

    if (!loginUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ profile: loginUser });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
