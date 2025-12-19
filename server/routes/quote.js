import express from 'express'
const router = express.Router();

import { getQuotes,postQuote } from '../controllers/quoteController.js';


router.get("/", getQuotes)


router.post('/', postQuote);



 export default router