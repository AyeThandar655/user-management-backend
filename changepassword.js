// changepassword.js
const express = require('express');
const pool = require('./db');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/change-password', async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  try {
    const verifyResult = await pool.query('SELECT verify_user_by_id($1) AS user_data', [id]);
    const verifyUserData = verifyResult.rows[0].user_data;
    const passwordMatch = await bcrypt.compare(oldPassword, verifyUserData.password);

    if (passwordMatch) {
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      const result = await pool.query('SELECT change_password($1, $2, $3) AS success', [id, verifyUserData.password, hashedNewPassword]);
      const success = result.rows[0].success;
      if (success) {
        res.status(200).json({ success: true, message: 'Change Password successfully.' });
      }
      else {
        res.status(401).json({ error: 'Incorrect old password or user not found.' });
      }
    }
    else {
      res.status(401).json({ success: false, message: 'Incorrect old password or user not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error.' });
  }
});

module.exports = router;
