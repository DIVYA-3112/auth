const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;
// console.log("print URI - ", URI);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(URI);
        console.log(`Connection with DB success ${conn.connection.host}`);
    }
    catch (err){
        console.log(`Error in connecting DB - `, err);
        process.exit(1);
    }
};

module.exports = connectDB;