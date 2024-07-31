require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Profile = require("../models/ProfileDetails");
const User = require("../models/User");

var GoogleStrategy = require("passport-google-oauth2").Strategy;
const CLIENT_ID = process.env.OAUTH2_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH2_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET_KEY;

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        // Find or create profile
        let userProfile = await Profile.findOne({ email: profile._json.email });
        if (!userProfile) {
          userProfile = new Profile({
            id: profile.id,
            name: profile.displayName,
            picture: profile._json.picture,
            email: profile._json.email,
            bio: "Hello, I am using SkillConnect",
          });
          await userProfile.save();
        }

        // Find or create user
        let user = await User.findOne({ email: profile._json.email });
        let UID; // Declare UID variable here
        let profileID;

        if (!user) {
          const userProfile = new Profile({
            name: profile.displayName,
            picture: profile.photos[0].value,
            email: profile._json.email,
            bio: "",
            description: "",
            skills: [],
          });
          await userProfile.save();

          user = new User({
            name: profile.displayName,
            email: profile._json.email,
            profile: userProfile._id, // Set the profile reference
            password: profile.displayName,
          });
          await user.save();

          UID = user._id.toString(); // Set UID when a new user is created
          profileID = userProfile._id.toString();
        } else {
          UID = user._id.toString(); // Set UID when an existing user is found
          // Update user's profile if needed
          user.profile = user.profile || userProfile._id; // Ensure the profile reference is correct
          await user.save();
          profileID = user.profile.toString(); // Set profileID when an existing user is found
        }

        // Generate JWT token
        const token = jwt.sign(
          { name: user.name, email: user.email },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        // Set cookies
        request.res.cookie("name", token, {
          httpOnly: false,
          // secure: true, // Set to true if using HTTPS
          maxAge: 3600000,
        });
        request.res.cookie("uid", UID, {
          httpOnly: false,
          // secure: true, // Set to true if using HTTPS
          maxAge: 3600000,
        });
        request.res.cookie("profileid", profileID, {
          httpOnly: false,
          // secure: true, // Set to true if using HTTPS
          maxAge: 3600000,
        });

        return done(null, { user: user, profile: userProfile, token });
      } catch (err) {
        return done(err);
      }
    }
  )
);
