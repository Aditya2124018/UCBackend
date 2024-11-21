const Items = require("../models/items")
const cloudinary = require("cloudinary").v2
function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type)

}

async function uploadFileToCloudinary(file,folder){
    const options = {folder,
        quality:"auto"
    }
    options.resource_type = "auto"
   return await cloudinary.uploader.upload(file.tempFilePath,options)

}
exports.addItem=async (req,res)=>{
   
    try {
        const {name,price,type,description} = req.body
        if(!name || !price || !type || !description){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully."
            })
        }
        try {
            const file = req.files.image
            
        const supportedtypes = ["jpg","jpeg","png"]
        const file_type = file.name.split(".")[1].toLowerCase()
        if(!isFileTypeSupported(file_type,supportedtypes)){
            return res.status(400).json({
                success:false,
                message:"File type not supported."
            })
        }

        const response = await uploadFileToCloudinary(file,"/UCClone")
        console.log(response)

        const dbresponse = await Items.create({
            name,description:description,price,imageURL:response.secure_url,public_id:response.display_name,type
        })
        res.status(200).json({
            success:true,
            cloudinary_res:response,
            db_res:dbresponse,
            message:"File uploaded Successfully & item added to database."
        })
        } catch (error) {
            return res.status(500).json({
                success:false,
                error : error.message,
                message:"Something went wrong."
            })
        }
        
        

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Item adding failed."
        })
    }
}