const { body } = require("express-validator");

const validateLoginUserData = [
  body("name").notEmpty().withMessage("name cannot be empty"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
];

module.exports = validateLoginUserData;
