import express from 'express'
const router = express.Router();

import { deleteSingleQuote, getQuoteById, getQuotes,postQuote, updatingQuote } from '../controllers/quoteController.js';
import { verifyToken } from '../middlewares/authMiddlware.js';


// router.get("/",verifyToken, getQuotes)

// get all quotes
router.get("/",verifyToken, getQuotes)

// get single quote
router.get('/:id',getQuoteById)

// delete single quote
router.delete('/:id', deleteSingleQuote);

// update single quote
router.put('/:id/edit', updatingQuote);


router.post('/',verifyToken, postQuote);



 export default router