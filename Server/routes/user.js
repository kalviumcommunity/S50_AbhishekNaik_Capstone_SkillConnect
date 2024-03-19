const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  loginUser,
} = require("../controllers/userControllers");
const validateSignupUserData = require("../middleware/validateSignupUserData");
const validateEditUserData = require("../middleware/validateEditUserData");
const validateLoginUserData = require("../middleware/validateLoginUserData");

router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.post("/", validateSignupUserData, createUser);
router.post("/login", validateLoginUserData, loginUser);

router.put("/:id", validateEditUserData, updateUserById);

router.patch("/:id", validateEditUserData, updateUserById);

router.delete("/:id", deleteUserById);

module.exports = router;
