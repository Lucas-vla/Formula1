const express = require("express");
// Validation

const User = require("./../models/User");
const authController = require("./../controllers/auth");

const router = express.Router();

router.post("/signin", authController.signUp);

module.exports = router;
