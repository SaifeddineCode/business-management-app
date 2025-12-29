import db from "../config/database.js";

const invoice = {

    getAll : async() =>{

        const getQueryInvoices = `
        SELECT inv.*,c.name FROM invoice as inv
        JOIN sales_orders as slo
        ON inv.order_id = slo.id
        JOIN customers as c
        ON c.id = slo.client_id
        ORDER BY inv.date desc ;
        `  

        const [rows] = await db.query(getQueryInvoices)
        return rows
    },
    checkInvoiceExists : async (orderId) => {
        const query = `SELECT 1 FROM invoice WHERE order_id = ?`;
        const [rows] = await db.execute(query, [orderId]);
    return rows;
    },
    insertInvoice : async (order_id, total_ht, tva, total_ttc, status) => {
    const query = `
        INSERT INTO invoice (order_id, total_ht, tva, total_ttc, status) 
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [order_id, total_ht, tva, total_ttc, status]);
    return result;
    },
    insertInvoiceItem : async (invoiceId, productId, quantity, unitPrice, total) => {
    const query = `
        INSERT INTO invoice_item (invoice_id, product_id, quantity, unit_price, total)
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [invoiceId, parseFloat(productId), quantity, unitPrice, total]);
    return result;
    }


}


export default invoice