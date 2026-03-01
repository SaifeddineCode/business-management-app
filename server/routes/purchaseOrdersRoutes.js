import express from "express"
import getTotalOfPOController from "../controllers/purchaseOrderController.js"

const router = express.Router()


router.get("/total",getTotalOfPOController)


export default router