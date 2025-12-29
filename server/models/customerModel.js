import db from "../config/database.js";

const Customer = {

    getAll : async () =>{
        const [rows] = await db.query('SELECT * FROM customers ORDER BY id DESC');
        return rows
    }
}



export default Customer;