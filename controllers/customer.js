const Items = require("../models/items")
module.exports = {
home : async(req,res)=>{
    try {
        const products = await Items.find({type:'Product'}).sort({createdAt:-1}).limit(5)
        const services = await Items.find({type:'Service'}).sort({createdAt:-1}).limit(5)

        res.status(200).json({
            success:true,
            products:products,
            services:services,
            message:"Data fetched Successfully."
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Data didn,t fetched Successfully."
        })
    }
},

products: async(req, res)=>{
    try{
        const products = await Items.find({type:'Product'}).sort({createdAt:-1})
        res.status(200).json({
            success:true,
            products:products,
            message:"Products Data fetched Successfully."
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Data didn,t fetched Successfully."
        })
    }
},

services: async(req, res)=>{
    try{
        const services = await Items.find({type:'Service'}).sort({createdAt:-1})

        res.status(200).json({
            success:true,
            services:services,
            message:"Services Data fetched Successfully."
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Data didn,t fetched Successfully."
        })
    }
}

}