const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/userModel');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // validate user
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all the required fields' });
        }

        // check if user exits
        const check = await User.findOne({ email });
        if (check) {
            return res.status(409).json({ message: "Usser already exist" });
        }

        // create and save user (password automatically hashed)
        const user = await User.create({ name, email, password });

        // respond
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password : user.password,
            createdAt: user.createdAt,
        });
    }
    catch (err) {
        console.error('Error in register user', err);
        return res.status(500).json({ message: "server error" });
    }
};

module.exports = {registerUser};

