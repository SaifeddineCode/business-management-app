import db from "../config/database.js"


const  getTotalOfPurchaseOrdersModel = async() =>{
    const totalPurchaseOrderQuery = `
    SELECT COUNT(*) as total FROM purchase_orders
    `
    const [row] =  await db.query(totalPurchaseOrderQuery)

    return row[0].total

}

export default getTotalOfPurchaseOrdersModel

