// editUser.js
const express = require('express');
const pool = require('./db');
const router = express.Router();

router.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await pool.query('SELECT delete_user($1)', [userId]);
        if (result.rowCount === 1) {
            res.status(200).json({ success: true, message: 'Delete successfully.' });
        } else {
            res.status(401).json({ success: false, message: 'Delete fail.' });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Internal Server Error.' });
    }
});

module.exports = router;
