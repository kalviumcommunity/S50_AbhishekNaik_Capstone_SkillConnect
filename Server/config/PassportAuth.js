require("dotenv").config();
const passport = require("passport");
const Profile = require("../models/ProfileDetails");

var GoogleStrategy = require("passport-google-oauth2").Strategy;
const CLIENT_ID = process.env.OAUTH2_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH2_CLIENT_SECRET;

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
          return done(null, newProfile);
        } else {
          return done(null, existingProfile);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
