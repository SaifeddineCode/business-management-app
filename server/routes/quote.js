import express from 'express'
const router = express.Router();
import db from '../../database/database.js';

// // POST route to save a new quote
// router.post('/', async (req, res) => {
//   try {
//     const {
//       clientID,
//       quoteNumber,
//       dateCreated,
//       status,
//       items,
//       subtotal,
//       taxAmount,
//       totalAmount
//     } = req.body;
//     console.log(req.body)

//     // Start transaction to ensure data consistency
//     // const connection = await db.getConnection();
//     // await connection.beginTransaction();

//     try {
//       // 1. Insert main quote data into 'devis' table
//       const [quoteResult] = await db.execute(
//         `INSERT INTO devis (client_id, date, total_ht, tva,total_ttc, statut) VALUES (?, ?, ?, ?, ?, ?)`,
//         [
//           clientID,
//           dateCreated,
//           taxAmount,
//           10,
//           status,
//           subtotal,
//           totalAmount
//         ]
//       );

//       const quoteId = quoteResult.insertId;

//       // 2. Insert each item into 'devis_items' table
//       for (const item of items) {
//         await db.execute(
//           `INSERT INTO devis_items (devis_id, produit_id, quantite,prix_unitaire,total) VALUES (?, ?, ?, ?, ?)`,
//           [
//             quoteId,
//             item.productId,
//             item.quantity,
//             item.unitPrice,
//             item.total
//           ]
//         );
//       }

//       // Commit transaction
//       await db.commit();
//       db.release();

//       res.status(201).json({
//         success: true,
//         message: 'Devis créé avec succès',
//         quoteId: quoteId,
//         quoteNumber: quoteNumber
//       });

//     } catch (error) {
//       // Rollback transaction in case of error
//     //   await db.rollback();
//     //   db.release();
//       throw error;
//     }

//   } catch (error) {
//     console.error('Erreur lors de la création du devis:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Erreur lors de la création du devis',
//       error: error.message
//     });
//   }
// });

// export default router

// router.post('/', async (req, res) => {
//   try {
//     const {
//       clientID,
//       quoteNumber,
//       dateCreated,
//       status,
//       items,
//       subtotal,
//       taxAmount,
//       totalAmount
//     } = req.body;
//     console.log(req.body)

//     try {
//       // 1. Insert main quote data into 'devis' table - FIXED PARAMETERS
//       const [quoteResult] = await db.execute(
//         `INSERT INTO devis (client_id, date, total_ht, tva, total_ttc, statut) VALUES (?, ?, ?, ?, ?, ?)`,
//         [
//           clientID,
//           dateCreated || new Date(), // provide default date if missing
//           subtotal,    // total_ht
//           taxAmount,   // tva
//           totalAmount, // total_ttc
//           status || 'Brouillon' // provide default status
//         ]
//       );

//       const quoteId = quoteResult.insertId;

//       // 2. Insert each item into 'devis_items' table
//       for (const item of items) {
//         await db.execute(
//           `INSERT INTO devis_items (devis_id, produit_id, quantite, prix_unitaire, total) VALUES (?, ?, ?, ?, ?)`,
//           [
//             quoteId,
//             item.productId,
//             item.quantity,
//             item.unitPrice,
//             item.total
//           ]
//         );
//       }

//       res.status(201).json({
//         success: true,
//         message: 'Devis créé avec succès',
//         quoteId: quoteId,
//         quoteNumber: quoteNumber || `DEV-${quoteId}` // generate number if missing
//       });

//     } catch (error) {
//       console.error('Database error:', error);
//       throw error;
//     }

//   } catch (error) {
//     console.error('Erreur lors de la création du devis:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Erreur lors de la création du devis',
//       error: error.message
//     });
//   }
// });

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
        `INSERT INTO devis (client_id, date, total_ht, tva, total_ttc, statut) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          clientID,
          dateCreated || new Date(),
          subtotal || 0,
          taxAmount || 0,
          totalAmount || 0,
          status || 'Brouillon'
        ]
      );

      const quoteId = quoteResult.insertId;
      console.log('Quote created with ID:', quoteId);

      // 2. Insert each item into 'devis_items' table
      for (const item of items) {
        console.log('Inserting item:', item);
        await db.execute(
          `INSERT INTO devis_lignes (devis_id, produit_id, quantite, prix_unitaire, total) VALUES (?, ?, ?, ?, ?)`,
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
      error: error.message
    });
  }
});

 export default router