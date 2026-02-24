import { supplierProductsModel } from "../models/supplierProductsModel.js"



export const supplierProductsController = async (req,res) =>{

    try{
        const supplier_ID = req.query.supplier_ID
        const result = await supplierProductsModel(supplier_ID)
        return res.json(result)
    }catch (err){
        console.log(err)
    }

}