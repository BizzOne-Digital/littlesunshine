// routes/careers.js
// Drop this file in your backend routes folder and register it in server.js:
//   const careersRouter = require('./routes/careers');
//   app.use('/api', careersRouter);
//
// Required packages (run in your backend folder):
//   npm install multer nodemailer

const express = require('express');
const multer  = require('multer');
const nodemailer = require('nodemailer');
const router  = express.Router();

// ── Multer: store uploaded resume in memory (max 5 MB) ──────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF or Word documents are allowed.'));
    }
  },
});

// ── Nodemailer transporter ───────────────────────────────────────────────────
// Uses the same Gmail account as the rest of your backend.
// Make sure these env vars are set in your .env file:
//   EMAIL_USER=littlesunshineelc23@gmail.com
//   EMAIL_PASS=your_gmail_app_password   ← 16-char App Password (not your login password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ── POST /api/careers ────────────────────────────────────────────────────────
router.post('/careers', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, position, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    // Build the email
    const mailOptions = {
      from: `"Little Sunshine Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // sends to littlesunshineelc23@gmail.com
      replyTo: email,
      subject: `Career Application – ${position || 'General'} – ${name}`,
      html: `
        <h2 style="color:#E8B84B;">New Career Application</h2>
        <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;">
          <tr><td style="padding:8px;font-weight:bold;width:140px;">Name</td><td style="padding:8px;">${name}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone || '—'}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;font-weight:bold;">Position</td><td style="padding:8px;">${position || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Cover Letter</td><td style="padding:8px;white-space:pre-wrap;">${message}</td></tr>
        </table>
        ${req.file ? '<p style="margin-top:16px;color:#2D7A3A;font-weight:bold;">✅ Resume attached — see attachment below.</p>' : '<p style="margin-top:16px;color:#999;">No resume file was attached.</p>'}
      `,
      // Attach the resume file if provided
      attachments: req.file
        ? [
            {
              filename: req.file.originalname,
              content: req.file.buffer,
              contentType: req.file.mimetype,
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Application sent successfully.' });
  } catch (err) {
    console.error('Career email error:', err);
    return res.status(500).json({ error: 'Failed to send application. Please try again.' });
  }
});

module.exports = router;
