import db from "../config/database.js"


export const  getTotalOfPurchaseOrdersModel = async() =>{
    const totalPurchaseOrderQuery = `
    SELECT COUNT(*) as total FROM purchase_orders
    `
    const [row] =  await db.query(totalPurchaseOrderQuery)

    return row[0].total

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

