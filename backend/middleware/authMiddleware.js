const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    // check for authorization headers
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // it return the decoded payload.
            const isValid = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(isValid.id).select('-password');
            next();
        }
        catch (err) {
            console.error("Error in protect route - ", err);
            return res.status(401).json({message : "error in protected route"});
        }
    }
    if(!token) {
        return res.status(400).json({Message : "No token received"});
    }
}

module.exports = {protect};