
import db from "../config/database.js";
import Customer from "../models/customerModel.js";


export const getClients= async (req, res) => {
    try {
        const clients = await Customer.getAll()
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

