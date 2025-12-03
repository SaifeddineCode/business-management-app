import express from "express"
import db from "../../database/database.js"

const router = express.Router();


router.post("/", async (req,res)=>{


    try{

        const {order_ID,date,total_ht,tva,total_ttc,statut} = req.body

        if(!order_ID){
            res.status(500).json({
                message :"There is no order selected"
            })
        }

        const invoiceQuery = `
            INSERT INTO invoice (order_id,total_ht,tva,total_ttc,statut) 
            VALUES (?,?,?,?,?)
        `
        const [resultInvoice] = await db.execute(invoiceQuery,[order_ID,total_ht,tva,total_ttc,statut])
        res.status(201).json({
            message:"the invoice was added successfuly"
        })

        
    }catch(err){
        console.log(err)
    }
})


export default router