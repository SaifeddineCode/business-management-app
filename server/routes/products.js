
import express from "express"
import {editSingleProduct, getProducts, getSingleProduct, postProduct } from "../controllers/productController.js";
import { verifyToken } from "../middlewares/authMiddlware.js";


const router = express.Router()

router.get('/',verifyToken, getProducts)
router.post('/',verifyToken, postProduct)
router.get('/:id',verifyToken, getSingleProduct)
router.put('/:id',verifyToken, editSingleProduct)


export default router