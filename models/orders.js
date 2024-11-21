const mongoose = require("mongoose")
const moment = require("moment-timezone")
const orders = mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Users'
    },
    item:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Items'
    },
    order_status:{
        type:String,
        enum:["Pending","Completed","Cancelled"]
    },
    payment_status:{
        type:String,
        enum:["Pending","Completed"]
    },
   
       
    
},{
    timestamps:true
})
module.exports = mongoose.model("Orders",orders)