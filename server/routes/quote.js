import express from 'express'
const router = express.Router();

import { getQuotes,postQuote } from '../controllers/quoteController.js';
import { verifyToken } from '../middlewares/authMiddlware.js';


router.get("/",verifyToken, getQuotes)


router.post('/',verifyToken, postQuote);



 export default router