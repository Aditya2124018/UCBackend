const mongoose = require("mongoose")
require("dotenv").config()
const dbconnect = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB connection successfull.")
    })
    .catch((error)=>{
        console.log("DB connection failed.")
        console.log(error)
    })
}
module.exports = dbconnect