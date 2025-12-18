import express from 'express'
const router = express.Router();
import db from '../../database/database.js';

import { getQuotes,postQuote } from '../controllers/quoteController.js';


router.get("/", getQuotes)


router.post('/', postQuote);



 export default router