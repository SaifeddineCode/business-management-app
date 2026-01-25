import express from "express"
import { getInvoices, postInvoice } from "../controllers/invoicesController.js";
import { verifyToken } from "../middlewares/authMiddlware.js";

const router = express.Router();


router.get("/",verifyToken,getInvoices)

router.post("/",verifyToken,postInvoice)


export default router