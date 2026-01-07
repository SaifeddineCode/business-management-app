import db from "../config/database.js";

 

// export const getQuoteWithPagination = async(page = 1 ,limit = 10) =>{
    
   
//     const offset = (page - 1) * limit

//     const query = `
//     SELECT 
//       q.*,                           
//       c.id as customer_id,           
//       c.name as customer_name,
//       c.email as customer_email,
//       c.telephone as customer_telephone,
//       c.adresse as customer_adresse
//     FROM quote q
//     LEFT JOIN customers c ON q.client_id = c.id
//     ORDER BY id DESC
//     LIMIT ? OFFSET ?
//     `
    
    
//     ;

//   const [quotes] = await db.execute(query,[1,4])
//   // const [quotes] = await db.execute(query)

//   const countQuery = `SELECT COUNT(*) as total FROM quote`;
//   const [countResult] = await db.execute(countQuery);
//   const total = countResult[0].total;

//   return {
//     quotes,
//     page,
//     limit,
//     total,
//     totalPages : Math.ceil(total / limit)
//   }

// }

// import db from '../config/database.js';

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