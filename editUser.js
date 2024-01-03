// edituser.js
const express = require('express');
const pool = require('./db');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/edit-user', async (req, res) => {
    const {
        user_id,
        first_name,
        last_name,
        birth_day,
        birth_month,
        birth_year,
        phone_number,
        role_id,
        department_id,
        password
    } = req.body;
    try {
        const hashedPassword = "";
        if(password !== ''){
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }
        const result = await pool.query(
            'SELECT edit_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
            [
                user_id,
                first_name,
                last_name,
                birth_day,
                birth_month,
                birth_year,
                phone_number,
                role_id,
                department_id,
                hashedPassword
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
