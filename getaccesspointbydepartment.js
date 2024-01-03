const express = require('express');
const pool = require('./db');
const router = express.Router();

router.post('/getaccesspoint-department', async (req, res) => {
    const { department_id } = req.body;
    try {
        const result = await pool.query('SELECT * FROM get_access_points_by_department($1) AS access_points', [department_id]);
        const accessPoints = result.rows[0].access_points;
        res.status(200).json({ success: true, message: 'Access point data.', access_points: { accessPoints } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
