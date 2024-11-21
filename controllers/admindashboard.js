const Items = require("../models/items")
const Orders = require("../models/orders")
const Users = require("../models/users")
module.exports = {
    getdashboard: async(req,res) =>{
        try {
            const userCount = await Users.countDocuments();

            // Get the count of orders
            const orderCount = await Orders.countDocuments();
        
            // Get the count of items that are services
            const serviceCount = await Items.countDocuments({ type: 'Service' });
        
            // Get the count of items that are products
            const productCount = await Items.countDocuments({ type: 'Product' });

             // Get the latest 5 users
            const latestUsers = await Users.find()
                .sort({ createdAt: -1 })
                .limit(5);

            // Get the latest 5 orders
            const latestOrders = await Orders.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate(["user","item"]);

            res.status(200).json({
                success:true,
                userCount:userCount,
                orderCount:orderCount,
                serviceCount:serviceCount,
                productCount:productCount,
                latestUsers:latestUsers,
                latestOrders:latestOrders,
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                error:error.message
            })
        }
    }
}