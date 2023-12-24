const express = require('express');
const pool = require('./db');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/reset-password', async (req, res) => {
  const { email, new_password, confirm_Password } = req.body;

  if (new_password !== confirm_Password) {
    return res.status(400).json({ success: false, message: 'Password and confirm password do not match' });
  }

  const hashedPassword = await bcrypt.hash(new_password, saltRounds);

  try {
    const result = await pool.query('SELECT reset_password($1, $2, $3) AS password_reset', [
      email,
      hashedPassword,
      hashedPassword,
    ]);

    const passwordReset = result.rows[0].password_reset;

    if (passwordReset) {
      res.status(200).json({ success: true, message: 'Reset password successful.' });
    } else {
      res.status(400).json({ success: false, message: 'Reset Password fail.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;
