import express from 'express'
import { getClients } from '../controllers/customersController.js';
import { verifyToken } from '../middlewares/authMiddlware.js';



const router = express.Router();

// GET all clients

router.get('/',verifyToken,getClients);





export default router;