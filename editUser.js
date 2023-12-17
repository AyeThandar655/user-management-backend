// edituser.js
const express = require('express');
const pool = require('./db'); 
const router = express.Router();

router.post('/edit', async (req, res) => {
    //const userId = req.params.id;
    const updatedUserData = req.body;
    try {
        const { user_id, name, email, phone_number, department_name, position_name } = updatedUserData;
        //const result = await pool.query('SELECT update_user($1, $2, $3, $4, $5)', [id, name, email, phonenumber, role]);
        const result = await pool.query('SELECT update_user_details($1, $2, $3, $4, $5)', [user_id, name, phone_number, department_name, position_name]);
        if (result.rowCount === 1) {
            res.status(200).json({ status: 'success', message: 'User updated successfully' });
        } else {
            res.status(404).json({ status: 'error', message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

module.exports = router;
