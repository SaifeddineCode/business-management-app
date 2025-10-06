import express from 'express'
import db from '../../database/database.js';
const router = express.Router();

// GET all clients

router.get('/', async (req, res) => {
    try {
        const [clients] = await db.execute('SELECT * FROM customers ORDER BY id DESC');
        res.json(clients );
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET single client by ID
router.get('/:id', async (req, res) => {
    try {
        const clientId = req.params.id;
        const [clients] = await db.execute('SELECT * FROM clients WHERE id = ?', [clientId]);
        
        if (clients.length === 0) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }
        res.json({ success: true, data: clients[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST create new client
router.post('/', async (req, res) => {
    try {
        const { nom, email, telephone, adresse } = req.body;
        console.log(req.body)
        
        // Basic validation
        if (!nom) {
            return res.status(400).json({ success:false, message: 'Client name is required' });
        }
        
        const [result] = await db.execute(
            'INSERT INTO clients (nom, email, telephone, adresse) VALUES (?, ?, ?, ?)',
            [nom, email, telephone, adresse]
        );
        
        res.json({ 
            success: true, 
            message: 'Client created successfully',
            clientId: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});



export default router;