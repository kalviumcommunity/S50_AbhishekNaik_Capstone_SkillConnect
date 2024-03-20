const { body } = require("express-validator");

const validatePostData = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
];

module.exports = validatePostData;
