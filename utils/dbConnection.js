const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

function dbConnect(){
    mongoose.connect(process.env.MONGO_DB).then(()=>{
        console.log(`Database is connected`.green.bold)
    })
}
module.exports = dbConnect