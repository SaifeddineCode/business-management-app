import {getAllSuppliersModel, postSupplierModel} from "../models/suppliersModel.js"


export const getAllSuppliers = async(req,res) =>{

    try{
        const result = await getAllSuppliersModel()

        return res.json(result)

    }catch(err){
        console.log(err)
    }
}


export const postSupplier = async(req,res) =>{

    console.log(req)

   try{
    const newSupplier = req.body
    const result = await postSupplierModel(newSupplier)

    return res.status(201).json(result.message)

    
   }catch(err){
    console.log(err)
   }

}