const Users = require("../models/users")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
require("dotenv").config()
exports.forgot_password = async(req,res)=>{
    try {
        const {email} = req.body
        const user = await Users.findOne({email:email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found."
            })
        }
        const payload = {
            "email":user.email,
            "id":user._id
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: "1h" })
        // console.log(jwt.verify(token,process.env.JWT_SECRET))
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD
            }
        })
        //Now sending mail
        let info = await transporter.sendMail({
            from:"Service Wala",
            to:user.email,
            subject: "Password Reset Link",
            html:`<h1 style:'text-align:center;color:red;'>Click on Below link to reset password</h1><p><a href='http://${process.env.FRONTEND_URL}/ResetPassword/${token}'>Reset Link</a></p>`
        })
        console.log(info)
        res.status(200).json({
            success:true,
            user:user,
            token:token,
            message:"Password reset link sent successfully."
        })
    } catch (error) {
        res.status(500).json({
            success:true,
            error:error.message
            
        })
    }
}