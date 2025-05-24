const express = require('express');
const router = express.Router();
const app = express();
const User = require("../models/userModel");
const {registerUser, loginUser, allUsers, logout, verifyEmail, deleteByEmail} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/restrict');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/allusers", allUsers);
router.get("/logout", logout);
router.get("/email-verify", verifyEmail);
router.delete("/delete/:id", deleteByEmail);

module.exports = router;