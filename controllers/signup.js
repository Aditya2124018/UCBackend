const Users = require("../models/users")
const bcrypt = require("bcrypt")
exports.signup = async(req,res)=>{
    // function date(){
    //     const date = new Date()
    //     return (`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`)
    // }
    try {
  
            const {fname,lname,address,email,mobile,password} =  req.body
            // const createdAt = date()
            if(!fname || !email || !mobile || !lname || !address || !password){
                return res.status(400).json({
                    success:false,
                    message:"Please fill all the details carefully."
                })
            }
            const hashedpwd = await bcrypt.hash(password,10)
            console.log(hashedpwd)
    
            if(mobile.length > 10 || mobile.length < 10){
                return res.status(400).json({
                    success:false,
                    message:"Mobile Number must have exact Ten(10) digits."
                })
            }
            const user_exists =await Users.findOne({
                $or: [
                    { email: email },
                    { mobile: mobile }
                ]
            })
            if(user_exists){
                return res.status(400).json({
                    success:false,
                    message:"User already exists."
                })
            }
            
        
        const response = await Users.create({fname,lname,address,email,mobile,password:hashedpwd})
        res.status(200)
        .json({
            success:true,
            response:response,
            message:"User Signedup Successfully."
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message,
            message:"User Signup failed."
        })
    }
}