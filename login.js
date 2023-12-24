// login.js
const express = require('express');
const pool = require('./db');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const verifyResult = await pool.query('SELECT verify_user($1) AS user_data', [email]);
    const verifyUserData = verifyResult.rows[0].user_data;
    const passwordMatch = await bcrypt.compare(password, verifyUserData.password);

    if (passwordMatch) {
      const result = await pool.query('SELECT login_user($1, $2) AS user_data', [email, verifyUserData.password]);
      const userData = result.rows[0].user_data;
      if (userData) {
        res.status(200).json({ success: true, message: 'Login successful.', user: userData });
      } else {
        res.status(401).json({ success: false, message: 'Incorrect password or user not found.' });
      }
    }
    else {
      res.status(401).json({ success: false, message: 'Incorrect password or user not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error.' });
  }
});

module.exports = router;
