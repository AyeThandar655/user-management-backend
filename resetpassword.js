const express = require('express');
const pool = require('./db');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/reset-password', async (req, res) => {
  const { reset_token, new_password } = req.body;

  const hashedPassword = await bcrypt.hash(new_password, saltRounds);
  console.log("hashedPassword....", hashedPassword);
  try {
    const result = await pool.query('SELECT reset_password_with_token($1, $2, $3) AS password_reset', [
      reset_token,
      hashedPassword,
      hashedPassword,
    ]);

    const passwordReset = result.rows[0].password_reset;
    if (passwordReset) {
      res.status(200).json({ success: true, message: 'Reset password successful.' });
    } else {
      res.status(400).json({ success: false, message: 'Your password reset token has expired. Please request a new one.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;
