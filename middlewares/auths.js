const jwt = require("jsonwebtoken")
require("dotenv").config()
const secret = process.env.JWT_SECRET

exports.isLoggedin = (req,res,next)=>{
    try {   
        const bearerHeader = req.headers['authorization'];  
        //check if bearer is undefined  
        if(typeof bearerHeader != 'undefined'){  
            //split at the space  
            const bearer = bearerHeader.split(' ');  
            //Get the token from array  
            const token = bearer[1]; 
        
            try{
                const payload = jwt.verify(token,secret)
                console.log(payload)
                req.user = payload
            }catch(error){
                return res.status(401).json({
                    success:false,
                    message:"Invalid Token"
                })}
            
        }else{
            return res.status(401).json({
                success:false,
                message:"Missing Token"
            })
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success:false,
            message:"Something Went wrong"
        })
    }
}

exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route only for Admin."
            })
        }
        next()
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"User's Role Can't be verified."
        })
    }
}