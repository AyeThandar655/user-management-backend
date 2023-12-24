// login.js
const express = require('express');
const pool = require('./db');

const router = express.Router();

router.post('/create-role', async (req, res) => {
    const { role_name, description } = req.body;
    try {
        const result = await pool.query('SELECT create_role($1, $2)', [role_name, description]);
        if (result) {
            res.status(200).json({ success: true, message: 'Create role successfully.' });
        }
        else {
            res.status(401).json({ success: false, message: 'Create role fail.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
});

module.exports = router;
