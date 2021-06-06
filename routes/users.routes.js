const express = require("express");
const getUsers = require("../controller/users/getUsers");
const getUserById = require("../controller/users/getUserById");
const updateUserById = require("../controller/users/updateUserById");

const router = express.Router();

router.get("/", getUsers)
router.get("/:userId", getUserById);
router.post("/:userId", updateUserById);

module.exports = router