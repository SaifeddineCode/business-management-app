import express from "express"
import { supplierProductsController } from "../controllers/supplierProductsController"

const router = express.Router()



router.get("/",supplierProductsController)