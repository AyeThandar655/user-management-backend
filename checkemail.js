const express = require('express');
const pool = require('./db');

const router = express.Router();

router.post('/check-email', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query('SELECT check_email_exists($1) AS email_data', [email]);
    const emailData = result.rows[0].email_data;

    if (emailData) {
      res.status(200).json({ success: true, message: 'Check email successful.', email: emailData });
    } else {
      res.status(200).json({ success: false, message: 'Incorrect email or user not found.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;
