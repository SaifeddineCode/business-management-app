import express from "express"
import {supplierProductsController}  from "../controllers/supplierProductsController.js"

const router = express.Router()



router.get("/",supplierProductsController)

export default router