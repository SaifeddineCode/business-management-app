import db from "../config/database.js";
import { deleteQuoteById, findQuoteById, getQuotesWithPagination, updateSingleQuote } from "../models/quoteModel.js";

// import { getQuotesWithPagination } from '../models/quoteModel.js';



// this controller to get specific quote by id 
export const getQuoteById = async (req,res) =>{
  try{
    const quote = await findQuoteById(req.params.id)

    if (!quote){
      return res.status(404).json({message:'Quote not found'})
    } 

    res.status(200).json(quote)

  }catch(err){
    res.status(500).json({message:"internal server error"})
  }
}


export const deleteSingleQuote = async (req,res) =>{
  try{

    const {id} = req.params
    const deleted = await deleteQuoteById(id)

    console.log(id)

    if (!deleted) {
    return res.status(404).json({ message: 'Quote not found' });
  }

  res.status(200).json({ message: 'Quote deleted successfully' });


  }
  catch(err){
    console.log(err)
  }
}




// updating specefic quote : 

export const updatingQuote = async(req,res) =>{
  
  try {
    const { id } = req.params;
    const quoteData = req.body; // This is your quoteToSave object
    
    // Validate
    if (!id || !quoteData) {
      return res.status(400).json({ success: false, message: 'Invalid data' });
    }
    
    // Call the model/service
    const result = await updateSingleQuote(id, quoteData);
    
    if (result) {
      return res.status(200).json({ 
        success: true, 
        message: 'Devis modifié avec succès',
        quote: result 
      });
    } else {
      return res.status(404).json({ success: false, message: 'Quote not found' });
    }
    
  } catch (error) {
    console.error('Error updating quote:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }


}







// this controller to get all quotes bayna aslan haha
export const getQuotes = async (req,res)=>{
  try {
  
  // Get page and limit from query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    

    const result = await getQuotesWithPagination(page,limit)


    res.status(200).json({
      success :"true",
      data : result.quotes,
      pagination: {
        currentPage: result.page,
        totalPages: result.totalPages,
        totalQuotes: result.total,
        limit: result.limit
      }
    })

    

  // res.status(200).json(quotes)

  }catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch quotes"
    });
  }
}


export const postQuote = async (req, res) => {
  try {
    const {
      clientID,
      quoteNumber,
      dateCreated,
      expiryDate,
      libelle,
      status,
      items,
      subtotal,
      taxAmount,
      totalAmount
    } = req.body;
    
    console.log('Received data:', req.body);

    // Validate required fields
    if (!clientID ) {
      return res.status(400).json({
        success: false,
        message: 'Client ID est requis'
      });
    }

    if (!libelle ) {
      return res.status(400).json({
        success: false,
        message: 'libelle est requis'
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
        `INSERT INTO quote (client_id,libelle, dateCreated, total_ht, tva, total_ttc, status,expiryDate) VALUES (?,?,?, ?, ?, ?, ?,?)`,
        [
          clientID,
          libelle,
          dateCreated ,
          subtotal,
          taxAmount,
          totalAmount,
          status,
          expiryDate
        ]
      );

      const quoteId = quoteResult.insertId;
      console.log('Quote created with ID:', quoteId);

      // 2. Insert each item into 'quote_item' table
      for (const item of items) {
        console.log('Inserting item:', item);
        await db.execute(
          `INSERT INTO quote_item (quote_ID, product_ID, quantity, unit_price, total,taxRate) VALUES (?, ?, ?, ?, ?,?)`,
          [
            quoteId,
            item.productId,
            item.quantity || 1,
            item.unit_price || 0,
            item.total || 0,
            item.taxRate
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
}

