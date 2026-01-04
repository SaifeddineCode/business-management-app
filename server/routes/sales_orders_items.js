import express from "express"
import { getSalesOrderItems } from "../controllers/salesOrder_ItemsController.js";
import { verifyToken } from "../middlewares/authMiddlware.js";

const router = express.Router()

router.get("/",verifyToken, getSalesOrderItems)



export default router;
