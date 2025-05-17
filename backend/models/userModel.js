const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true, "Name is required"],
        },
        email : {
            type : String,
            required : [true, "Email is required"],
            unique : true,
            match : [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
        },
        password : {
            type : String,
            required : [true, "Please enter your password"],
            minlength : [6, "Password must be atleast 6 char long"]
        }
    },
    {
        timestamps : true,
    }
)

const user = mongoose.model("User", userSchema);

module.exports = user;