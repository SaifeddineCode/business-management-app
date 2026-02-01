
import express from "express"
import { getProducts, getSingleProduct, postProduct } from "../controllers/productController.js";
import { verifyToken } from "../middlewares/authMiddlware.js";


const router = express.Router()

router.get('/',verifyToken, getProducts)
router.post('/',verifyToken, postProduct)
router.get('/:id',verifyToken, getSingleProduct)


export default router