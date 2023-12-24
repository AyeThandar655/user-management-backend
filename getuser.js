const express = require('express');
const pool = require('./db');
const router = express.Router();

router.post('/getuser', async (req, res) => {
  const { role_id } = req.body;
  try {
    const result = await pool.query('SELECT get_users_by_role($1) AS user_data', [role_id]);
    const userData = result.rows[0].user_data;
    if (userData) {
      res.status(200).json({ success: true, user_data: userData });
    }
    else {
      res.status(401).json({ success: false, message: 'User data not found.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;
