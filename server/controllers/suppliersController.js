import {getAllSuppliersModel} from "../models/suppliersModel.js"



export const getAllSuppliers = async(req,res) =>{

    try{
        const result = await getAllSuppliersModel()

        return res.json(result)

    }catch(err){
        console.log(err)
    }



}