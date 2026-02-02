import db from "../config/database.js";
import { editSingleProductModel, getSingleProductModel, postSingleProduct } from "../models/productModel.js";

// Get all products 

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



// Get a single product 


export const getSingleProduct = async (req,res) =>{

    try{

    const {id} = req.params;

    if (!id) {
    return res.status(400).json({
      message: "Product id is required"
    });
    }


    const result = await getSingleProductModel(id)

    if(result.length > 0){
        return res.status(200).json(result[0])
    }
   return res.status(404).json({ message: "Product not found" });
    

    } catch(err){
        console.log(err)
        res.status(500).json({
            message:'something went wrong while fetching single product'
        })
    }

}


// Post a products 

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


// Edit a product 

export const editSingleProduct = async (req,res) => {

    console.log(req.body)

    try{
        const {id} = req.params;
        const productData = req.body;
        
        if(!id){
            return res.status(400).json({error:"Product id is required"})
        }

        const result = await editSingleProductModel(productData,id)

        res.status(200).json({
            success:true,
            message:"Product updated successfuly",
            data:result
        })



    }catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Error updating user"
        })
    }

}


