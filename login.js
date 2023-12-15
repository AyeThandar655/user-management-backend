// login.js
const express = require('express');
const pool = require('./db');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT login_user($1, $2) AS login_result',
      [email, password]
    );

    const { login_result } = result.rows[0];

    if (login_result.status) {
      // Successful login
      res.json(login_result);
    } else {
      // Failed login
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
