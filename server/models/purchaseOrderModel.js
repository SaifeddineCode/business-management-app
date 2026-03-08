import db from "../config/database.js"




export const getAllPurchaseOrdersModel = async(page,limit) =>{
    const offset = (page - 1) * limit

    const query = `
        SELECT * FROM purchase_orders LIMIT ? OFFSET ?
    `
    const [purchaseOrders] = await db.query(query,[limit,offset])

    const [count] = await db.query(
    "SELECT COUNT(*) as total FROM purchase_orders"
  );

    return {
        purchaseOrders,
        totalPO : count[0].total
    }
}



export const  getTotalOfPurchaseOrdersModel = async() =>{
    const totalPurchaseOrderQuery = `
    SELECT max(id) as maxID FROM purchase_orders
    `
    const [rows] =  await db.query(totalPurchaseOrderQuery)

    const lastID = rows[0].maxID ?? 0; 
  
    return lastID + 1;

}


export const insertIntoPurchaseOrderModel = async (purchaseOrder) =>{

    const {
        po_number,
        supplier_id,
        order_date,
        currency,
        subject,
        incoterm,
        delivery_location,
        article_code_type,
        requires_signature,
        tva_rate,
        total_before_tax,
        tva_amount,
        total_with_tax,
        internal_notes
    } = purchaseOrder

    const insertQuery = `
    INSERT INTO purchase_orders
    (po_number,
    supplier_id,
    order_date,
    currency,
    subject,
    incoterm,
    delivery_location,
    article_code_type,
    requires_signature,
    tva_rate,
    total_before_tax,
    tva_amount,
    total_with_tax,
    internal_notes)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `
    const row = await db.execute(insertQuery,[
        po_number,
        supplier_id,
        order_date,
        currency,
        subject,
        incoterm,
        delivery_location,
        article_code_type,
        requires_signature,
        tva_rate,
        total_before_tax,
        tva_amount,
        total_with_tax,
        internal_notes
    ])

    return row

}




// export default getTotalOfPurchaseOrdersModel

