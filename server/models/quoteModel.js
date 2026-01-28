import db from "../config/database.js";

 

export const findQuoteById = async(id) =>{


  try{
    // Fetch the main single quote from quote table
  const [quoteResult] = await db.execute(`
     SELECT q.*,
     c.name as customer_name,
     c.email as customer_email,
     c.telephone as customer_phone
     FROM quote as q        
    JOIN customers as c ON c.id = q.client_id
    WHERE q.id = ?
    `,[id])

  if(!quoteResult || quoteResult.length === 0 ){
    return null
  }

  // const quote = quoteResult[0]
  const mainQuote = quoteResult[0]

  // now let's Fetch its item from quote_item table


  const [itemsResult] = await db.query(
      // 'SELECT * FROM quote_item WHERE quote_ID = ?',
      `
      select qt.*,
      p.product_name
      from quote_item as qt
      JOIN products as p
      ON qt.product_ID = p.id
      WHERE qt.quote_id = ?
      `,
      [id]
    );

    const quote = {
      ...mainQuote,
      items : itemsResult
    }

 // in on fetch we get quote and its item
    // return {
    //   ...quote,
    //   items: itemsResult || []
    // };
    return quote

  }catch(err){
    console.error(err)
    return null
  }
}


export const deleteQuoteById = async (id) =>{

  // const [result] = await db.execute(`
  //     DELETE FROM quote
  //     WHERE id = ?
  //   `,[id]);

  const [result] = await db.execute(
  'UPDATE quote SET deleted_at = NOW() WHERE id = ?',
  [id]
);
    return result.affectedRows
}


// update single quote 

export const updateSingleQuote = async (id,quoteData) =>{
  try {
    // Update the quote in database
    const result = await db.query(
      `UPDATE quote SET 
        client_id = ?, 
        libelle = ?, 
        dateCreated = ?, 
        total_ht = ?, 
        tva = ?, 
        total_ttc = ?, 
        status = ?, 
        expiryDate = ?
       WHERE id = ?`,
      [
        quoteData.client_id,
        quoteData.libelle,
        quoteData.dateCreated,
        quoteData.subtotal,
        quoteData.taxAmount,
        quoteData.totalAmount,
        quoteData.status,
        quoteData.expiryDate,
        id
      ]
    );
    
    // Also update items if needed
    // if (quoteData.items && quoteData.items.length > 0) {
    //   // Delete old items
    //   // await db.query('DELETE FROM quote_item WHERE quote_ID = ?', [id]);
      
    //   // Insert new items
    //   for (let item of quoteData.items) {
    //     await db.query(
    //       `UPDATE quote_item SET product_ID = ? , quantity = ?, unit_price = ?, total = ?, taxRate = ? 
    //       WHERE id = ? AND quote_ID = ?`,
    //       //  VALUES (?, ?, ?, ?, ?, ?),
    //       [item.product_ID , item.quantity, item.unit_price, item.total, item.taxRate,item.id,id]
    //     );
    //   }
    // }else {
    //   await db.query(` INSERT INTO quote_item (quote_ID, product_ID, quantity, unit_price, total, taxRate)  
    //         VALUES (?, ?, ?, ?, ?, ?) ` , [id,item.product_ID , item.quantity, item.unit_price, item.total, item.taxRate])
    // }
    if (quoteData.items && quoteData.items.length > 0) {
      for (let item of quoteData.items) {
        if (item.id) {
          // Update existing item
          const updateResult = await db.query(
            `UPDATE quote_item SET product_ID = ?, quantity = ?, unit_price = ?, total = ?, taxRate = ? 
            WHERE id = ? AND quote_ID = ?`,
            [item.product_ID, item.quantity, item.unit_price, item.total, item.taxRate, item.id, id]
          );

          if(updateResult.affectedRows === 0 ){
            console.log("item not found or not updated")
          }else{
            console.log("item updated" )
          }

        } else {
          // Insert new item (no id)
          const insertResult = await db.query(
            `INSERT INTO quote_item (quote_ID, product_ID, quantity, unit_price, total, taxRate) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [id, item.product_ID, item.quantity, item.unit_price, item.total, item.taxRate]
          );

          if(insertResult.insertId === 0){
            console.log("new item inserted")
          }else{
            console.log("item insertion failed")
          }
        }
      }
    }
    
    // Return updated quote
    return { success: true, id, ...quoteData };
    
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }


}



// Get all quotes with pagination
export const getQuotesWithPagination = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  
  // Get quotes for current page
  const query = `
    SELECT 
      q.*,                           
      c.id AS customer_id,           
      c.name AS customer_name,
      c.email AS customer_email,
      c.telephone AS customer_telephone,
      c.adresse AS customer_adresse
    FROM quote q
    LEFT JOIN customers c ON q.client_id = c.id
    WHERE q.deleted_at IS NULL
    ORDER BY q.id DESC
    LIMIT ? OFFSET ?;
  `;


  const [quotes] = await db.query(query,[limit,offset]);
  
  // Get total count of quotes
  const countQuery = `SELECT COUNT(*) as total FROM quote`;
  const [countResult] = await db.execute(countQuery);
  const total = countResult[0].total;
  
  return {
    quotes,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};