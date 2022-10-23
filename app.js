const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const Package = require("./models/Package");

app.use(express.json());
app.use(cors())

const packageRoute = require('./routes/package.route')

app.use('/api/v1/package',packageRoute);


app.get('/' , (req,res)=>{
    console.log(`running`);

})

module.exports = app;