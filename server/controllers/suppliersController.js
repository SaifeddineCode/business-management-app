import {getAllSuppliersModel, postSupplierModel} from "../models/suppliersModel.js"


export const getAllSuppliers = async(req,res) =>{

    try{
        const result = await getAllSuppliersModel()

        return res.json(result)

    }catch(err){
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export const postSupplier = async(req,res) =>{

    console.log(req.body)

   try{
    const newSupplier = req.body

    const {name,email,phone} = newSupplier

    if(!name,!email,!phone){
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await postSupplierModel(newSupplier)

    return res.status(201).json(result.message)

    
   }catch(err){
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' });
   }

}