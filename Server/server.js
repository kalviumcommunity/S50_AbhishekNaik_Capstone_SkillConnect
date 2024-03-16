require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const DatabaseConnection = require("./config/DatabaseConnection");
const pingRoute = require("./routes/ping");
const userRoute = require("./routes/user");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
var session = require("express-session");
require("./config/PassportAuth");

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "skillconnect",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/ping", pingRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/homepage", (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.redirect("http://localhost:5173/homepage");
  }
});

DatabaseConnection();

const server = app.listen(port, () => {
  console.log(`🚀 server running on PORT: ${port}`);
});

module.exports = server;
