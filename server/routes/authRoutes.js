import express from "express"
import { login, register } from "../controllers/authController.js"

const router = express.Router()


// register endpoint
router.post("/register",register)


//login endpoint

router.post("/login",login)

export default router;


