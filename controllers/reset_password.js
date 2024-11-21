const Users = require("../models/users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
exports.reset_password = async(req,res)=>{
    try {
        const bearerHeader = req.headers['authorization'];  
        //check if bearer is undefined  
        if(typeof bearerHeader != 'undefined'){  
            //split at the space  
            const bearer = bearerHeader.split(' ');  
            //Get the token from array  
            const token = bearer[1]; 
            // set the token  
     const {password} = req.body
     console.log(password)
     const user = jwt.verify(token,process.env.JWT_SECRET)
     console.log(user)
     if(!user || !await Users.findOne({_id:user.id})){
        return res.status(400).json({
            success:false,
            message:"Invalid Token"
        })
     }
     const hashedpwd = await bcrypt.hash(password,10)
     const response = await Users.findByIdAndUpdate({_id:user.id},{password:hashedpwd})

     res.status(200).json({
        success:true,
        response:response,
        message:"Password Reset Successfull."
     })

    }
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
    })
}}