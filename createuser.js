// login.js
const express = require('express');
const pool = require('./db');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/create-user', async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        birth_day,
        birth_month,
        birth_year,
        phone_number,
        password,
        role_id,
        department_id,
        create_date
    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await pool.query(
            'SELECT create_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) AS user_id',
            [
                first_name,
                last_name,
                email,
                birth_day,
                birth_month,
                birth_year,
                phone_number,
                hashedPassword,
                hashedPassword,
                role_id,
                department_id,
                create_date
            ]
        );

        const user_id = result.rows[0].user_id;
        if (result.rowCount === 1) {
            res.status(200).json({ success: true, message: 'Create user successfully.', user_id: { user_id } });
        } else {
            res.status(401).json({ success: false, message: 'Create user fail.' });
        }
    } catch (error) {
        if (error.message.includes('Email already exists')) {
            res.status(409).json({ success: false, message: 'Email already exists.' });
        } else {
            res.status(500).json({ success: false, message: 'Internal Server Error.' });
        }
    }
});

module.exports = router;
