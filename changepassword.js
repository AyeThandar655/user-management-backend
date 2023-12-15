// changepassword.js
const express = require('express');
const pool = require('./db');

const router = express.Router();

router.post('/change-password', async (req, res) => {
    const { id, oldPassword, newPassword } = req.body;

    try {
      // Call the stored procedure to change the password
      const result = await pool.query('SELECT change_password($1, $2, $3) AS success', [id, oldPassword, newPassword]);
      const success = result.rows[0].success;
  
      if (!success) {
        return res.status(401).json({ error: 'Incorrect old password or user not found' });
      }
  
      res.status(200).json({ status: true, message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
