const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    console.log("Home page route started");
    res.end("This is a Home page");
})

app.listen(PORT, () => {console.log(`Server started on PORT - ${PORT}`)});

