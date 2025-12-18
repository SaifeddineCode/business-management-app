import express from "express"
import { getQuoteItems } from "../controllers/quote_ItemsController.js"

const router = express.Router()


router.get("/",getQuoteItems)

export default router