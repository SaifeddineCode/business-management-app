import express from "express"
import { getQuoteItems } from "../controllers/quote_ItemsController.js"
import { verifyToken } from "../middlewares/authMiddlware.js"

const router = express.Router()


router.get("/",verifyToken,getQuoteItems)

export default router