import express from 'express'
const router = express.Router();
import db from '../../database/database.js';



router.get("/", async(req,res)=>{
  const [quotes] = await db.execute("SELECT * FROM quote")
  res.send(quotes)
  console.log(quotes)
})


router.post('/', async (req, res) => {
  try {
    const {
      clientID,
      quoteNumber,
      dateCreated,
      status,
      items,
      subtotal,
      taxAmount,
      totalAmount
    } = req.body;
    
    console.log('Received data:', req.body);

    // Validate required fields
    if (!clientID) {
      return res.status(400).json({
        success: false,
        message: 'Client ID est requis'
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Au moins un article est requis'
      });
    }

    try {
      // 1. Insert main quote data into 'devis' table
      const [quoteResult] = await db.execute(
        `INSERT INTO quote (client_id, date, total_ht, tva, total_ttc, statut) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          clientID,
          dateCreated ,
          subtotal,
          taxAmount,
          totalAmount,
          status
        ]
      );

      const quoteId = quoteResult.insertId;
      console.log('Quote created with ID:', quoteId);

      // 2. Insert each item into 'quote_item' table
      for (const item of items) {
        console.log('Inserting item:', item);
        await db.execute(
          `INSERT INTO quote_item (quote_ID, product_ID, quantity, unit_price, total) VALUES (?, ?, ?, ?, ?)`,
          [
            quoteId,
            item.productId,
            item.quantity || 1,
            item.unitPrice || 0,
            item.total || 0
          ]
        );
      }

      res.status(201).json({
        success: true,
        message: 'Devis créé avec succès',
        quoteId: quoteId,
        quoteNumber: quoteNumber || `DEV-${quoteId}`
      });

    } catch (dbError) {
      console.error('Database error details:', dbError);
      res.status(500).json({
        success: false,
        message: 'Erreur base de données',
        error: dbError.message,
        code: dbError.code
      });
    }

  } catch (error) {
    console.error('General error:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du devis',
    });
  }
});



 export default router