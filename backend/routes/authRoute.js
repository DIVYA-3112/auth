const express = require('express');
const router = express.Router();
const app = express();
const User = require("../models/userModel");
const {registerUser, loginUser} = require('../controllers/authController');

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;