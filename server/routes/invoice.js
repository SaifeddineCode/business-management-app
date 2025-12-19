import express from "express"
import { getInvoices, postInvoice } from "../controllers/invoicesController.js";

const router = express.Router();


router.get("/",getInvoices)

router.post("/",postInvoice)


export default router