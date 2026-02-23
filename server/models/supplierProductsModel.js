import db from "../config/database.js";

export const supplierProductsModel = async (supplier_ID) =>{
    const supplierProductQuery = `
    SELECT p.*,sp.supplier_price
    FROM supplier_products as sp
    JOIN products as p 
    ON p.id = sp.product_id 
    WHERE supplier_id = ?
    `

    const [rows] = await db.query(supplierProductQuery,[supplier_ID])

    return rows
}