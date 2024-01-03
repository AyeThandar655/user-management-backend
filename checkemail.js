const express = require('express');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const pool = require('./db');
const router = express.Router();

router.post('/check-email', async (req, res) => {
  const { email } = req.body;

  try {
    const reset_token = uuidv4();
    const result = await pool.query('SELECT generate_password_reset_token($1, $2)', [email, reset_token]);
    if (result.rows.length === 0) {
      // Handle case where email does not exist
      res.status(404).json({ success: false, message: 'Email not found.' });
      return;
    }
    const resetToken = result.rows[0].generate_password_reset_token;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'usermanagementbuff@gmail.com',
        pass: 'agvu hidx lndf avnp',
      },
    });

    const mailOptions = {
      from: 'usermanagementbuff@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://localhost:3000/reset-password?token=${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Already sent for your reset password link. Please check your mailbox.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;
