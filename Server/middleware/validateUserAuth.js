const Profile = require("../models/ProfileDetails");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  // console.log("cookies", req.cookies.name);
  try {
    // console.log("header",req.headers.cookie);
    const token = req.cookies.name || req.body.name || req.headers["name"];
    // console.log("token",token);
    if (!token) {
      return res.status(401).json({
        error: "User not authenticated",
      });
    }

    const details = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { username, email } = details;

    const profiledetails = await Profile.findOne({ email: email });
    req.user = profiledetails;
    next();
  } catch (err) {
    return res.status(401).json({
      error: "User not authenticated",
    });
  }
};

module.exports = auth;
