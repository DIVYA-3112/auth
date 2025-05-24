const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {sendVerificationEmail} = require("../utils/mailer");

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
        const token = jwt.sign(email, process.env.JWT_SECRET_KEY);

        sendVerificationEmail(email, token);

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

const verifyEmail = async (req, res) => {
    if(req.header && req.header.token) {
        const token = req.header.token;
        const isValid = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({isValid});
        user.verified = true;
        await user.save();
    }
} 

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password) {
            return res.status(401).json({meassage : "Please enter all the fields"});
        }
        const user = await User.findOne({email});
        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch == false) {
            return res.status(501).json({message : "Incorrect password"});
        }

        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({id : user.id}, JWT_SECRET_KEY, {expiresIn : '1h'});

        return res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            password :user.password,
            token,
        });
    }
    catch (err) {
        console.error("Error in login route", err);
        return res.status(401).json({message : "server error"});
    }
};

const allUsers = async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    }
    catch (err) {
        console.error("error in showing all user ", err);
        return res.status(502).json({message : "error in showing all user"});
    }
}

const logout = (req, res) => {
    return res.status(200).json({message : "Dummy logout succesfull"});
}

const deleteByEmail = async (req, res) => {
    console.log(req.params.id);
    const email = req.params.id;
    const isValid = await User.findOne({email});
    if(!isValid) {
        return res.status(401).json({message : `User with email : ${email}, not found`});
    }
    const user = await User.deleteOne({email});
    if(user.deletedCount === 1) {
        return res.status(200).json({message : `User with email : ${email}, deleted successfully`});
    }
    else {
        return res.status(400).json({message : "error in deleting user"});
    }
}

module.exports = {registerUser, loginUser, allUsers, logout, verifyEmail, deleteByEmail};

