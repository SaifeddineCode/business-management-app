import express from "express"
import {getAllPurchaseOrdersController, getTotalOfPOController, postPurchaseOrderController} from "../controllers/purchaseOrderController.js"

const router = express.Router()


router.get("/total",getTotalOfPOController)

router.get("/",getAllPurchaseOrdersController)


router.post("/",postPurchaseOrderController)


export default router