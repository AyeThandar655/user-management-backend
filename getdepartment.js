const express = require('express');
const pool = require('./db');
const router = express.Router();

router.get('/getdepartment', async (req, res) => {
  try {
    const result = await pool.query('SELECT get_department_data() AS department_data');
    const departmentData = result.rows[0].department_data;
    if (departmentData) {
      res.status(200).json({ success: 'success', department_data: departmentData });
    }
    else {
      res.status(401).json({ success: false, message: 'Department data not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
