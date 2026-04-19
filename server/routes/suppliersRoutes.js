import express from "express"
import { getAllSuppliers, postSupplier } from "../controllers/suppliersController.js"

const router = express.Router()


router.get("/",getAllSuppliers)
router.post("/",postSupplier)


export default router