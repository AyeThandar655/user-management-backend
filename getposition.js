const express = require('express');
const pool = require('./db');
const router = express.Router();

router.post('/getposition', async (req, res) => {
  const positionData = req.body;
  try {
    const { department_name } = positionData;
    const result = await pool.query('SELECT * FROM get_positions_for_department($1)', [department_name]);
    const position = result.rows;
    res.status(200).json({ status: 'success', position_data: position });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;