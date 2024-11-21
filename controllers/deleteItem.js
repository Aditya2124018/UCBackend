const cloudinary = require("cloudinary").v2
const Items = require("../models/items")

exports.deleteItem= async(req,res)=>{
    try {
        // cloudinary.uploader.destroy('UCClone/iiwb6zcqca8c9nlq9yzz', function(error, result){console.log(result);});
        const id = req.params.id
        const find_res = await Items.findById(id)
        const cloudinary_res = await cloudinary.uploader.destroy(`UCClone/${find_res.public_id}`, function(error, result){return(result);});

        const delete_res = await Items.deleteOne({_id:id})

        res.status(200).json({
            success:true,
            data:find_res,
            cloudinary_res:cloudinary_res,
            delete_res:delete_res,
            message:"data fetched and deleted."
        })

        
    } catch (error) {
         console.log(error)
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Item deletion failed."
        })
    }
}