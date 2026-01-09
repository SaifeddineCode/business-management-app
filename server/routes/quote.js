import express from 'express'
const router = express.Router();

import { getQuoteById, getQuotes,postQuote } from '../controllers/quoteController.js';
import { verifyToken } from '../middlewares/authMiddlware.js';


// router.get("/",verifyToken, getQuotes)
router.get("/",verifyToken, getQuotes)



router.get('/:id',getQuoteById)


router.post('/',verifyToken, postQuote);



 export default router