import express from "express"
import db from "../../database/database.js"

const router = express.Router();





router.get("/",async(req,res)=>{
    
    const getInvoice = `
    SELECT inv.*,c.name FROM invoice as inv
    JOIN sales_orders as slo
    ON inv.order_id = slo.id
    JOIN customers as c
    ON c.id = slo.client_id
    ORDER BY inv.date desc
    ;
    `  
    const [result] = await db.execute(getInvoice)
    res.status(200).json({
        message:"the invoice list was fetched successuly",
        invoices : result
    }) 

})


router.post("/", async (req,res)=>{


    try{

        const {order_ID,date,total_ht,tva,total_ttc,status,invoiceItems} = req.body


        if(!order_ID){
            res.status(500).json({
                message :"There is no order selected"
            })
        }

        const queryTocheckInvoice  = `SELECT 1 FROM invoice WHERE order_id = ?`

        const [rows] = await db.execute(queryTocheckInvoice,[order_ID])

        
        if (rows.length > 0) {
            return res.status(500).json({
                message:"order id is already in invoice"
            })
        } 

        const invoiceQuery = `
            INSERT INTO invoice (order_id,total_ht,tva,total_ttc,status) 
            VALUES (?,?,?,?,?)
        `
        const [resultInvoice] = await db.execute(invoiceQuery,[order_ID,total_ht,tva,total_ttc,status])


        const invoiceID = resultInvoice.insertId

        console.log(invoiceID)

        // const {product_id,quantity,unit_price,total} = invoiceItems

        const invoiceItemQuery = `
            INSERT INTO invoice_item (invoice_id,product_id,quantity,unit_price,total)
            values (?,?,?,?,?)
        `
        
        for (const invoiceItem of invoiceItems) {
            const response = await db.execute(invoiceItemQuery,[invoiceID,parseFloat(invoiceItem.product_id),invoiceItem.quantity,invoiceItem.unit_price,invoiceItem.total])

        }

        res.status(201).json({
            message:"the invoice was added successfuly"
        })

        
    }catch(err){
        console.log(err)
    }
})


export default router