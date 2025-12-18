import db from "../../database/database.js";



export const getClients= async (req, res) => {
    try {
        const [clients] = await db.execute('SELECT * FROM customers ORDER BY id DESC');
        res.json(clients);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

