
import database from "../config/database.js"


export  const getAllSuppliersModel = async () => {

    const queryAllSuppliers = `
    SELECT * FROM suppliers
    `

    const [rows] = await database.query(queryAllSuppliers)

    return rows

}


export const postSupplierModel = async(newSupplier) =>{

    const {name,email,phone,address,city,contact_person} = newSupplier

    const postQuery = `
    INSERT INTO suppliers (name,email,phone,address,city,contact_person)
    VALUES(?,?,?,?,?,?)
    `

    const row = await database.execute(postQuery,
        [name,email,phone,address,city,contact_person]
    )

    return row

}