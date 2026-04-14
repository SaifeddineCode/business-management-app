import db from "../config/database.js"




export const getAllPurchaseOrdersModel = async(page,limit) =>{
    const offset = (page - 1) * limit

    const query = `
        SELECT po.*, sp.contact_person  
        from
        purchase_orders as po     
        JOIN  suppliers  as sp
        on po.supplier_id = sp.id
        LIMIT ? OFFSET ?
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


export const getSinglePurchaseOrderModel = async (id) =>{
    const querySingle = `
        SELECT po.*,
        sp.name as supplier_name,
        sp.address as supplier_address,
        sp.email as supplier_email,
        sp.phone as supplier_phone
        FROM purchase_orders as po
        JOIN suppliers as sp
        ON po.supplier_id = sp.id
        WHERE po.id = ?;
    `

    const querySinglePoDetails = `
        SELECT poi.*, pdt.product_name 
        FROM purchase_order_items as poi
        join products as pdt
        ON poi.product_id = pdt.id
        where poi.purchase_order_id = ?;
    `


    const [purchaseOrder] = await db.execute(querySingle,[id])
    const [purchaseOrderItems] = await db.execute(querySinglePoDetails,[id])

    return {purchaseOrder,purchaseOrderItems}
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

