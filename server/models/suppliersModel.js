
import database from "../config/database.js"


export  const getAllSuppliersModel = async () => {

    try{
    const queryAllSuppliers = `
    SELECT * FROM suppliers
    `

    const [rows] = await database.query(queryAllSuppliers)

    return rows
    }catch(err){
        console.error("Error fetching suppliers :",err.message)
        throw new Error('Failed to fetch suppliers from database')
    }

}


export const postSupplierModel = async(newSupplier) =>{

    try{
        const {name,email,phone,address,city,contact_person} = newSupplier

    if (!name || !email || !phone) {
        throw new Error('Name, email, and phone are required fields')
    }
    

    const postQuery = `
    INSERT INTO suppliers (name,email,phone,address,city,contact_person)
    VALUES(?,?,?,?,?,?)
    `

    const row = await database.execute(postQuery,
        [name,email,phone,address,city,contact_person]
    )

    return row
    }catch(err){
        console.error("Error creating supplier : ",err.message)
        throw err
    }

}