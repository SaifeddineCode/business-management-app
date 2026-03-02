import express from "express"
import {getTotalOfPOController, postPurchaseOrderController} from "../controllers/purchaseOrderController.js"

const router = express.Router()


router.get("/total",getTotalOfPOController)


router.post("/",postPurchaseOrderController)


export default router