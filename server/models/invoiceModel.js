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
    }

}


export default invoice