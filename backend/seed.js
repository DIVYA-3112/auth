const mongoose = require('mongoose');
const User = require('./models/userModel');
const dotenv = require('dotenv');
dotenv.config();

const seed = async () => {
    const URI = process.env.MONGO_URI;
    console.log(URI);
    await mongoose.connect(URI);
    const user = await User.create({
        name : "Admin",
        password : "Admin@123",
        email : "Admin@gmail.in",
        role : "admin",
    });

    console.log("Admin User Created", user.email);
    mongoose.disconnect();
}

seed();