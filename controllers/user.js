const Users  =require("../models/users")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const secret = process.env.JWT_SECRET
module.exports = {
    get: async(req,res)=>{
        
            try {
                if(req.query.id){
                    const id= req.query.id
                    const dbres = await Users.find({_id:id})
                   return res.status(200).json({
                        success:true,
                        data:dbres,
                        message:"Users details fetched Successfully."
                    })
                }
                if(!req.query.id){
                    const bearerHeader = req.headers['authorization'];  
        //check if bearer is undefined  
        if(typeof bearerHeader != 'undefined'){  
            //split at the space  
            const bearer = bearerHeader.split(' ');  
            //Get the token from array  
            const token = bearer[1]; 
        
            
                const payload = jwt.verify(token,secret)
                console.log(payload)
                if(payload.role !== "Admin"){
                    return res.status(401).json({
                        success:false,
                        message:"Invalid Token"
                    })}
                }
            }
                // const {id} = req.params
                const page = Number(req.query.page) || 1
                const limit = Number(req.query.limit) || 10
                const skip = (page - 1) * limit
                const dbres = await Users.find({}).skip(skip).limit(limit)
                const totalres = await Users.find({})
                const datalength = totalres.length
                const pageCount = Math.ceil(datalength/limit)
                
                res.status(200).json({
                    success:true,
                    data:dbres,
                    pagecount:pageCount,
                    message:"Users details fetched Successfully."
                })
            } catch (error) {
                res.status(500).json({
                    success:false,
                    error:error.message,
                    message:"User details fetching failed. ."
                })
            }
        
    },

    update: async(req,res)=>{
        try {
            const {id} = req.params
            const {fname, lname, mobile,email,address,role} = req.body
            if(!fname || !lname || !mobile || !email || !address || !role){
                return res.status(400).json({
                    success:false,
                    message:"Please fill all the details carefully."
                })
            }
            if(mobile.length > 10 || mobile.length < 10){
                return res.status(400).json({
                    success:false,
                    message:"Mobile Number must have exact Ten(10) digits."
                })
            }
            const response = await Users.findByIdAndUpdate(id,
                {fname:fname,lname:lname,mobile:mobile,email:email,address:address,role:role})
            
            return res.status(200).json({
                success:true,
                response:response,
                message:"User's Details updated."
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message,
                message:"User's Details didn't updated."
            })
        }
    }
}