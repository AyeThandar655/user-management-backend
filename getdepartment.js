const express = require('express');
const pool = require('./db');
const router = express.Router();

router.get('/getdepartment', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM get_departments()');
    const department = result.rows;
    res.status(200).json({ status: 'success', department_data: department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
