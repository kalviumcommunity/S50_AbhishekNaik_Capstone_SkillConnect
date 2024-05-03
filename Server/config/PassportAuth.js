require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Profile = require("../models/ProfileDetails");

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
      // console.log(profile);
      try {
        const existingProfile = await Profile.findOne({ id: profile.id });
        if (!existingProfile) {
          const newProfile = new Profile({
            id: profile.id,
            name: profile.displayName,
            picture: profile.picture,
            email: profile.email,
          });
          await newProfile.save();
          const token = jwt.sign(
            { name: profile.displayName, email: profile.email },
            JWT_SECRET
          );
          console.log("Profile token", token);
          request.res.cookie("name", token, {
            httpOnly: true,
            // secure: true,
            maxAge: 3600000,
          });

          return done(null, { profile: newProfile, token });
        } else {
          const token = jwt.sign(
            { name: existingProfile.name, email: existingProfile.email },
            JWT_SECRET
          );
          console.log("Existing token", token);
          request.res.cookie("name", token, {
            httpOnly: true,
            // secure: true,
            maxAge: 3600000,
          });

          return done(null, { profile: existingProfile, token });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
