import db from "../config/database.js";


export const getQuoteItems = async (req,res)=>{
    
    try{
        // const query = `SELECT * FROM quote_item`

        const query = `
        select * from quote_item as q_i
        JOIN products as p 
            ON q_i.product_ID = p.id
        `


        const [quoteItem]= await db.execute(query)

        if(quoteItem.length === 0){
            return res.status(200).json({
                success : true,
                message : "No quote items found",
                data:[]
            });
        }

        return res.status(200).json({
            success:true,
            data : quoteItem
        });



    } catch (error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to fetch quote items",
            error : error.message
        })
    }
    
}