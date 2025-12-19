import db from "../config/database.js";


export const getSalesOrderItems = async(req,res)=>{

    try{

        const getQuery = `
        SELECT * FROM sales_order_items
        `

        const [response] = await db.execute(getQuery)

        return res.status(200).json({
        success:true,
        message:"Sales Orders items was fetched successefully",
        data :response
        })

    } catch(err){
        console.log(err)
    }

}