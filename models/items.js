const mongoose = require("mongoose")
const items = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imageURL:{
        type:String,
        required:true,
    
    },
    public_id:{
        type:String,
        required:true,
    
    },
    type:{
        type:String,
        enum:['Product','Service'],
        required:true
    },
    
},{
    timestamps:true
})
module.exports = mongoose.model("Items",items)