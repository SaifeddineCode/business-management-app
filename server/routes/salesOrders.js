import express from "express"
import { getSalesOrders, postSaleOrder } from "../controllers/salesOrderController.js"
import { verifyToken } from "../middlewares/authMiddlware.js"

const router = express.Router()




router.get("/",verifyToken,getSalesOrders)

router.post("/",verifyToken ,postSaleOrder)


export default router
