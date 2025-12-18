import express from "express"
import { getSalesOrderItems } from "../controllers/salesOrder_ItemsController.js";

const router = express.Router()

router.get("/", getSalesOrderItems)



export default router;
