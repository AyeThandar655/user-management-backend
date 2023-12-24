const express = require('express');
const pool = require('./db');
const router = express.Router();

router.post('/getposition', async (req, res) => {
  try {
    const result = await pool.query('SELECT get_position_data() AS position_data');
    const positionData = result.rows[0].position_data;
    if (positionData) {
      res.status(200).json({ success: 'success', position_data: positionData });
    }
    else {
      res.status(401).json({ success: false, message: 'Position data not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;