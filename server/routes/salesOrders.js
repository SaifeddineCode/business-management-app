
import express from "express"
import db from "../../database/database.js"
import { getSalesOrders, postSaleOrder } from "../controllers/salesOrderController.js"

const router = express.Router()




router.get("/",getSalesOrders)

router.post("/", postSaleOrder)


export default router
