// login.js
const express = require('express');
const pool = require('./db');

const router = express.Router();

router.post('/edit-role', async (req, res) => {
    const { role_id, role_name, description } = req.body;
    try {
        const result = await pool.query('SELECT edit_role($1, $2, $3)', [role_id, role_name, description]);
        if (result) {
            res.status(200).json({ success: true, message: 'Edit successfully.' });
        }
        else {
            res.status(401).json({ success: false, message: 'Edit fail.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
});

module.exports = router;
