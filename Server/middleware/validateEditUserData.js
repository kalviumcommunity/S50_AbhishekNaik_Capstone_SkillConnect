const { body } = require("express-validator");

const validateEditUserData = [
  body("name").trim().optional().notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .optional()
    .withMessage("Invalid email"),
];

module.exports = validateEditUserData;
