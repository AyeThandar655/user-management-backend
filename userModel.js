const express = require('express');
const pool = require('./db');
const router = express.Router();

router.post('/user_data', async (req, res) => {
  const updatedUserData = req.body;
  try {
    const { role } = updatedUserData;
    //const result = await pool.query('SELECT * FROM get_users_by_role($1)', [role]);
    const result = await pool.query('SELECT * FROM get_user_details()');
    const users = result.rows;
    res.status(200).json({ status: 'success', user_data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
