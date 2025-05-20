const express = require('express');
const router = express.Router();
const app = express();
const User = require("../models/userModel");
const {registerUser, loginUser, allUsers} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/allusers", protect, allUsers);

module.exports = router;