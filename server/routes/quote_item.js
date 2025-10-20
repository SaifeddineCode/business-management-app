import express from "express"
import db from "../../database/database"

const router = express.Router()


router.get("/",(req,res)=>{
    
    const query = `
    SELECT * FROM quote_item
    `

    const quote_item = db.execute(query)

    res.send(quote_item)
    
})