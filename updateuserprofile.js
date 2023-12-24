const express = require('express');
const pool = require('./db');
const router = express.Router();

router.post('/update-user-profile', async (req, res) => {
    const {
        user_id,
        first_name,
        last_name,
        surn_name,
        birth_day,
        birth_month,
        birth_year,
        phone_number
    } = req.body;
    try {
        const result = await pool.query(
            'SELECT update_user_profile($1, $2, $3, $4, $5, $6, $7, $8)',
            [
                user_id,
                first_name,
                last_name,
                surn_name,
                birth_day,
                birth_month,
                birth_year,
                phone_number
            ]
        );
        const updatedUserDataArray = result.rows[0].update_user_profile;

        if (updatedUserDataArray && updatedUserDataArray.length > 0) {
            const updatedUserData = updatedUserDataArray[0]; 
            res.status(200).json({ success: true, message: 'Updated user profile successfully.', user: updatedUserData });
        } else {
            res.status(404).json({ success: false, message: 'Updated user profile fail.' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error.' });
    }
});

module.exports = router;
