import express from 'express'
const router = express.Router();

import { deleteSingleQuote, getQuoteById, getQuotes,postQuote } from '../controllers/quoteController.js';
import { verifyToken } from '../middlewares/authMiddlware.js';


// router.get("/",verifyToken, getQuotes)

// get all quotes
router.get("/",verifyToken, getQuotes)

// get single quote
router.get('/:id',getQuoteById)

// delete single route
router.delete('/quote/:id', deleteSingleQuote);


router.post('/',verifyToken, postQuote);



 export default router