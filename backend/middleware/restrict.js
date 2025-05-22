const restrictTo = (req, res, next) => {
    const role = req.user.role;
    // console.log(req.user);
    if (role === 'user') {
        return res.status(402).json({ Message: "User do not have access to this route" });
    }
    else if (role === 'admin') {
        next();
    }
    else {
        return res.status(409).json({ Message: "role not defined"});
    }
};

module.exports = { restrictTo };