const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, createUser } = require("../controllers/userControllers");
const validateUserData = require("../middleware/validateUserData");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", validateUserData, createUser);

module.exports = router;
