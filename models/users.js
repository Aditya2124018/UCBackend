const mongoose = require("mongoose")

const Users = mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
    
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['Admin','User'],
        default:'User'
    },
    
},{
    timestamps:true
})
module.exports = mongoose.model("Users",Users)