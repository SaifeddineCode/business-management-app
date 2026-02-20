import database from "../config/database.js"


export  const getAllSuppliersModel = async () => {

    const queryAllSuppliers = `
    SELECT * FROM suppliers
    `

    const [rows] = await database.query(queryAllSuppliers)

    return rows

}