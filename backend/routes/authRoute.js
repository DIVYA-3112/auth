const express = require('express');
const router = express.Router();
const app = express();
const User = require("../models/userModel");
const {registerUser, loginUser, allUsers, logout} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/restrict');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/allusers", protect, restrictTo, allUsers);
router.get("/logout", logout);

module.exports = router;