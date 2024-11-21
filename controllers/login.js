const Users = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
exports.login = async(req,res)=>{
    try {
        const {username, password} = req.body
        if(!username || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully."
            })
        }
        const user =await Users.findOne({
            $or: [
                { email: username },
                { mobile: username }
            ]
        })
        if(!user){
            return  res.status(401).json({
                success:false,
                message:"Login Failed, invalid Mobile/Email or Password."
            })
        }
        const pwd_verification = await bcrypt.compare(password,user.password)
        if( !pwd_verification){
            return  res.status(401).json({
                success:false,
                message:"Login Failed, invalid Mobile/Email or Password."
            })
        }
        const payload = {
            username:username,
            password:user.password,
            role:user.role
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET)
        
        res.status(200).json({
            success:true,
            user:user,
            token:token,
           message:"Login Success"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}