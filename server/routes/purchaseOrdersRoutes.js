import express from "express"
import {getAllPurchaseOrdersController, getSinglePurchaseOrderController, getTotalOfPOController, postPurchaseOrderController} from "../controllers/purchaseOrderController.js"

const router = express.Router()


router.get("/total",getTotalOfPOController)

router.get("/",getAllPurchaseOrdersController)
router.get("/:id",getSinglePurchaseOrderController)


router.post("/",postPurchaseOrderController)


export default router