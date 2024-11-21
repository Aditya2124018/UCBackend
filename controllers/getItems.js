const Items = require("../models/items")
exports.getItems = async(req,res)=>{
    
        
        try {
            if(req.query.id){
                const id = req.query.id
                const dbres = await Items.find({_id:id})
               return res.status(200).json({
                    success:true,
                    data:dbres,
                    message:"Item details fetched Successfully."
                })
            }
            // const {id} = req.params
            const page = Number(req.query.page) || 1
                const limit = Number(req.query.limit) || 10
                const skip = (page - 1) * limit
                const dbres = await Items.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit)
                const totalres = await Items.find({})
                const datalength = totalres.length
                const pageCount = Math.ceil(datalength/limit)
            
            res.status(200).json({
                success:true,
                data:dbres,
                pagecount:pageCount,
                message:"Items details fetched Successfully."
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                error:error.message,
                message:"Item details fetching failed. ."
            })
        }
}