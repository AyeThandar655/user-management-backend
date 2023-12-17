// editUser.js
const express = require('express');
const pool = require('./db');
const router = express.Router();

router.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        //const result = await pool.query('SELECT delete_user($1)', [userId]);
        const result = await pool.query('SELECT delete_user_by_id($1)', [userId]);
        if (result.rowCount === 1) {
            res.status(200).json({ status: true, message: 'User deleted successfully' });
        } else {
            res.status(404).json({ status: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
