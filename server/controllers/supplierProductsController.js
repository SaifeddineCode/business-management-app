import { supplierProductsModel } from "../models/supplierProductsModel"



export const supplierProductsController = async (req,res) =>{

    const supplier_ID = req.query.supplier_ID

    const result = await supplierProductsModel(supplier_ID)

    

}