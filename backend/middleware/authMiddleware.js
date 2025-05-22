const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    // check for authorization headers
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            if(!token) {
                return res.status(401).json({Message : "Token not found"});
            }

            // it return the decoded payload.
            const isValid = jwt.verify(token, process.env.JWT_SECRET_KEY);
            // console.log(isValid);
            req.user = await User.findById(isValid.id).select('-password');
            next();
        }
        catch (err) {
            console.error("Token validation failed, protect route - ", err);
            return res.status(401).json({message : "Token validation failed, protect route"});
        }
    }
    if(!token) {
        return res.status(400).json({Message : "No token received"});
    }
}

module.exports = {protect};