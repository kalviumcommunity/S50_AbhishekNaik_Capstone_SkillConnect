require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const ES_SECRET = process.env.EXPRESS_SESSION_SECRET;
const DatabaseConnection = require("./config/DatabaseConnection");
const pingRoute = require("./routes/ping");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/validateUserAuth");
var session = require("express-session");
require("./config/PassportAuth");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(
  session({
    secret: ES_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/ping", pingRoute);
app.use("/user", userRoute);
app.use("/post", auth, postRoute);
app.use("/auth", authRoute);
app.use("/homepage", (req, res) => {
  if (req.isAuthenticated()) {
    // console.log(req.user);
    res.redirect("http://localhost:5173/homepage");
  }
});

DatabaseConnection();

const server = app.listen(port, () => {
  console.log(`🚀 server running on PORT: ${port}`);
});

module.exports = server;
