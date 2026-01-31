import db from "../config/database.js";
import { postSingleProduct } from "../models/productModel.js";

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


export const postProduct = async(req,res)=>{
    
    try{

        const productData = await req.body

        const result = await postSingleProduct(productData)

        res.status(201).json({
            success : true,
            id:result.insertId
        })


    }catch(err){
        console.log(err)
        res.status(500).json({
            success : false,
            message : "Failed to create product"
        })
    }
}