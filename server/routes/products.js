
import express from "express"
import { getProducts } from "../controllers/productController.js";
import { verifyToken } from "../middlewares/authMiddlware.js";


const router = express.Router()

router.get('/',verifyToken, getProducts)


export default router