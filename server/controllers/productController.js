import db from "../../database/database.js";

export const getProducts = async(req,res)=>{
    try {
        // we did it like this [products] so we can get the first element 
        //  which is products table 
        const [products] = await db.execute('SELECT * from products')
        res.send(products)
    } catch (error) {
        res.send(error.message)
        console.log(error)
    }
}