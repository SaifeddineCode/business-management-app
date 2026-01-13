import db from "../config/database.js";

 

export const findQuoteById = async(id) =>{

  const [rows] = await db.execute(`
     SELECT q.*,
     c.name as customer_name
     FROM quote q        
    JOIN customers c ON c.id = q.client_id
    WHERE q.id = ?
    `,[id])

    return rows[0]

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

export const updateSingleQuote = async (id,columnUpdated,valueUpdated) =>{
  const queryUpdate = ` 
    UPDATE quote 
    set ${columnUpdated} = ?
    where id = ? 
  `

  const [result] = await db.execute(queryUpdate,[valueUpdated,id])

  return result.affectedRows
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