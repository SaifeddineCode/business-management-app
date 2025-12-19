import express from 'express'
import { getClients } from '../controllers/customersController.js';



const router = express.Router();

// GET all clients

router.get('/', getClients);





export default router;