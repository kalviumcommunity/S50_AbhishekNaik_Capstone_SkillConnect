const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  loginUser,
  logoutUser,
  getSingleUser,
} = require("../controllers/userControllers");
const validateSignupUserData = require("../middleware/validateSignupUserData");
const validateEditUserData = require("../middleware/validateEditUserData");
const validateLoginUserData = require("../middleware/validateLoginUserData");

router.get("/", getAllUsers);

router.post("/getsingle", getSingleUser);

router.post("/", validateSignupUserData, createUser);
router.post("/login", validateLoginUserData, loginUser);
router.post("/logout", logoutUser);

router.put("/:id", updateUserById);

router.patch("/:id", updateUserById);

router.delete("/:id", deleteUserById);

module.exports = router;
