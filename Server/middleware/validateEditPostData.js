const { body } = require("express-validator");

const validateEditPostData = [
  body("title").trim().optional().notEmpty().withMessage("Title is required"),
  body("description")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Description is required"),
];

module.exports = validateEditPostData;
