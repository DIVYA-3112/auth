const express = require('express');
const router = express.Router();
const app = express();
const User = require("../models/userModel");
const {registerUser} = require('../controllers/authController');

router.post("/register", registerUser);

module.exports = router;