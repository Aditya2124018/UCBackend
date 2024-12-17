const Orders = require("../models/orders")
const Items = require("../models/items")
const Users = require("../models/users")

module.exports = {
    create: async(req,res)=>{
        try {
            const {user_id,item_id,order_status,payment_status} = req.body
            const dbres = await Orders.create({
                user:user_id,item:item_id, order_status:order_status,payment_status:payment_status
            })
            // const dbsaveres = dbres.save()
            res.status(200).json({
                success:true,
                data:dbres,
                message:"Order created Successfully."
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                error:error.message,
                message:"Order createion Failed."
            })
        }
    },
    get: async(req,res)=>{
        try {

            if(req.query.id){
                const id= req.query.id
                const dbres = await Orders.find({_id:id}).populate(["user","item"])
               return res.status(200).json({
                    success:true,
                    data:dbres,
                    message:"Order details fetched Successfully."
                })
            }

            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 10
            const skip = (page - 1) * limit
            const dbres = await Orders.find({}).populate(["user","item"]).skip(skip).limit(limit)
            const totalres = await Orders.find({})
            const datalength = totalres.length
            const pageCount = Math.ceil(datalength/limit)
                
                res.status(200).json({
                    success:true,
                    data:dbres,
                    pagecount:pageCount,
                    message:"Order details fetched Successfully."
                })
            
           
        } catch (error) {
            res.status(500).json({
                success:false,
                error:error.message,
                message:"Order details fetching failed. ."
            })
        }
    },

    update: async(req,res)=>{
        try {
            const {id} = req.params
            const {os,ops} = req.body
            if(!os || !ops){
                return res.status(400).json({
                    success:false,
                    message:"Please fill all the details carefully."
                })
            }
            const dbres = await Orders.findByIdAndUpdate(id,{
                order_status:os,
                payment_status:ops
            })
            res.status(200).json({
                success:true,
                data:dbres,
                message:"Order details updated Successfully."
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                error:error.message,
                message:"Order details updation failed."
            })
        }
    },
    getDetails: async(req, res)=>{
        try{
            const {uid, itemid} = req.body
            const user = await Users.findById(uid)
            const item = await Items.findById(itemid)
             res.status(200).json({
                success:true,
                user:user,
                item:item,
                message:"Details fetched Successfully."

             })

        }catch(error){
            res.status(500).json({
                success:false,
                error:error.message,
                message:"Details not fetched."

             })
        }
    },
    userorder:async(req, res)=>{
        try {
            const id = req.query.id
            const orders = await Orders.find({user:id}).populate(["user","item"])
            res.status(200).json({
                success:true,
                order:orders,
                message:"Orders data fetched successfully."
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                error:error.message
            })
        }
    }
}