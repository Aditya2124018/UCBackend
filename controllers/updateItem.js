const Items = require("../models/items")
const cloudinary = require("cloudinary").v2

exports.updateItem = async(req,res)=>{

    function isFileTypeSupported(type,supportedTypes){
        return supportedTypes.includes(type)
    
    }
    
    async function uploadFileToCloudinary(file,folder,public_id){
        const options = {folder,
            quality:"auto",
            public_id:public_id
        }
        options.resource_type = "auto"
       return await cloudinary.uploader.upload(file.tempFilePath,options)
    
    }
    // function getImage(){
      
    //     if(req.file){
    //         const image = req.file.filename
    //          return image
    //     }else{
    //         const image = req.body.image
    //         return image
    //     }
    // }
    try {
        const id = req.params['id']
       
        const {name,description,price,type} = req.body
        
        if(name === undefined || description === undefined  || price === undefined  || type === undefined){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully."
            })
        }
        try{
            if(req.files.image){
            const item_data = await Items.findById(id)
            console.log(item_data)
            const file = req.files.image
            const cloudinary_res = await uploadFileToCloudinary(file,"/UCClone",item_data.public_id)
            const db_resimg = await Items.findByIdAndUpdate(id,{
                name:name,description:description,price:price,type:type,imageURL:cloudinary_res.secure_url
            })
            res.status(200).json({
                success:true,
                data:db_resimg,
                message:"Item updated successfully."
            })
        }}
        catch(error){
            const db_res = await Items.findByIdAndUpdate(id,{
                name:name,description:description,price:price,type:type
            })

            res.status(200).json({
                success:true,
                data:db_res,
                message:"Item updated successfully."
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Item Updation failed."
        })
    }
}