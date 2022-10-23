const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const DbConnect = require("./utils/dbConnection");

const app = require("./app");

DbConnect();

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`.blue.bold);

})