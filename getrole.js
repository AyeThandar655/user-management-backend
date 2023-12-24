const express = require('express');
const pool = require('./db');
const router = express.Router();

router.get('/getrole', async (req, res) => {
    try {
        const result = await pool.query('SELECT get_role_data() AS role_data');
        const roleData = result.rows[0].role_data;

        if (roleData) {
            res.status(200).json({ success: true, role_data: roleData });
        }
        else {
            res.status(401).json({ success: false, message: 'Role data not found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

module.exports = router;
