import {getTotalOfPurchaseOrdersModel, insertIntoPurchaseOrderModel} from "../models/purchaseOrderModel.js"


export const  getTotalOfPOController = async (req,res) =>{

    try{

        const result = await getTotalOfPurchaseOrdersModel()

        if(result === null || result === undefined){
            throw new Error("something went wrong")
        }

        return res.json(result)

    }catch (err){
        console.log(err)
    }

}


export const postPurchaseOrderController = async (req,res) =>{

    try{
        const purchaseOrder = await req.body
        const result = await insertIntoPurchaseOrderModel(purchaseOrder)

        return res.status(201).json({
            result
        })

    }catch(err){
        console.log(err)
    }
}
