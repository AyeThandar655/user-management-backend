// edituser.js
const express = require('express');
const pool = require('./db');
const router = express.Router();

router.post('/edit-user', async (req, res) => {
    const {
        user_id,
        first_name,
        last_name,
        surn_name,
        birth_day,
        birth_month,
        birth_year,
        phone_number,
        role_id,
        department_id,
        position_id,
    } = req.body;
    try {
        const result = await pool.query(
            'SELECT edit_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
            [
                user_id,
                first_name,
                last_name,
                surn_name,
                birth_day,
                birth_month,
                birth_year,
                phone_number,
                role_id,
                department_id,
                position_id,
            ]
        );
        if (result.rowCount === 1) {
            res.status(200).json({ success: true, message: 'User updated successfully.' });
        } else {
            res.status(401).json({ success: false, message: 'User updated fail.' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error.' });
    }
});

module.exports = router;
