const mongoose = require("mongoose");

const packageSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true , "Please provide a name"],
        trim:true,
        unique:[true,"Name should be unique"],
        minLength:[3,"Name must be at least 6 characters"],
        maxLength:[100,"Name is too long"]
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:[0,"Price can't be negative"]
    },
    image:{
        type:String,
        required:true
    },
    person:{
        type:Number,
        required:true,
        min:[1,"Package set for atleast 1 person"]
    },
    day:{
        type:Number,
        required:true,
        min:[1,"Package set for atleast 1 day"]
    },
    night:{
        type:Number,
        required:true
    }
},{
    timestamp:true
})
// middleware
packageSchema.pre('save',function(next){
    console.log('Beforsave the data');
    next();
});

packageSchema.methods.logger = function(){
    console.log(`Data save for ${this.name}`);
};

const Package = mongoose.model('Package' , packageSchema);

module.exports = Package;