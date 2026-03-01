import getTotalOfPurchaseOrdersModel from "../models/purchaseOrderModel.js"


const  getTotalOfPOController = async (req,res) =>{

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

export default getTotalOfPOController