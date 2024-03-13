const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, createUser, deleteUserById, updateUserById } = require("../controllers/userControllers");
const validateSignupUserData = require("../middleware/validateSignupUserData");
const validateEditUserData = require("../middleware/validateEditUserData");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", validateSignupUserData, createUser);
router.delete("/:id",  deleteUserById);
router.put("/:id", validateEditUserData, updateUserById);
router.patch("/:id", validateEditUserData, updateUserById);

module.exports = router;
