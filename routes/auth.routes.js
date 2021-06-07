const express = require("express");
const googleLogin = require("../controller/auth/google-login");
const login = require("../controller/auth/login");
const signup = require("../controller/auth/signup");
const welcome = require("../controller/auth/welcome");

const router = express.Router();

router.get("/", welcome);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/signup", signup);

module.exports = router;