const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db')
connectDB();

const authRoutes = require("./routes/authRoute");

const app = express();
const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    console.log("Home page route started");
    res.end("This is a Home page");
})

app.use(express.json());
app.use("/", authRoutes);

app.listen(PORT, () => {console.log(`Server started on PORT - ${PORT}`)});

