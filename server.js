import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter connection
transporter.verify((error) => {
  if (error) {
    console.warn('⚠️ SMTP Transporter Connection Error: Verification failed. Fill out your credentials in .env.');
  } else {
    console.log('🚀 SMTP Server ready to dispatch Nodemailer messages.');
  }
});

// API endpoint for contact submissions
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing name, email, or message payloads.' });
  }

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL || 'arindambetal1994@gmail.com',
    replyTo: email,
    subject: `New Website Contact: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <h3>New Website Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; padding: 10px; background: #f4f4f5; border-radius: 6px;">${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Nodemailer SMTP Error:', err);
    return res.status(500).json({ error: 'Failed to dispatch email via SMTP server.' });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`Node Express server active on http://localhost:${PORT}`);
});
