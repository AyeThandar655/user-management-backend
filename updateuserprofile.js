const express = require('express');
const multer = require('multer');
const pool = require('./db');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/profileimage/'); // Specify the directory where you want to save the files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-image-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

router.post('/update-user-profile', upload.single('user_image'), async (req, res) => {
    const {
        user_id,
        first_name,
        last_name,
        birth_day,
        birth_month,
        birth_year,
        phone_number
    } = req.body;

    const user_image = req.file ? req.file.filename : null; 
    try {
        const result = await pool.query(
            'SELECT update_user_profile($1, $2, $3, $4, $5, $6, $7, $8)',
            [
                user_id,
                first_name,
                last_name,
                birth_day,
                birth_month,
                birth_year,
                phone_number,
                user_image
            ]
        );

        const updatedUserDataArray = result.rows[0].update_user_profile;

        if (updatedUserDataArray && updatedUserDataArray.length > 0) {
            const updatedUserData = updatedUserDataArray[0];
            res.status(200).json({ success: true, message: 'Updated user profile successfully.', user: updatedUserData });
        } else {
            res.status(404).json({ success: false, message: 'Updated user profile fail.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error.' });
    }
});

module.exports = router;
