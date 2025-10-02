import db from "../../database/database.js";
import express from "express"


const router = express.Router()

router.get('/', async(req,res)=>{
    try {
        // we did it like this [products] so we can get the first element 
        //  which is products table 
        const [products] = await db.execute('SELECT * from produits')
        res.send(products)
    } catch (error) {
        res.send(error.message)
        console.log(error)
    }
})


export default router