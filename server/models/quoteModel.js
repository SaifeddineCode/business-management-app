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

// Get all quotes with pagination
export const getQuotesWithPagination = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  
  // Get quotes for current page
  const query = `
    SELECT 
      q.*,                           
      c.id as customer_id,           
      c.name as customer_name,
      c.email as customer_email,
      c.telephone as customer_telephone,
      c.adresse as customer_adresse
    FROM quote q
    LEFT JOIN customers c ON q.client_id = c.id
    ORDER BY id DESC
    LIMIT ? OFFSET ?
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