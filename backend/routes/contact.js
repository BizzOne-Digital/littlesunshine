const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// POST /api/contact - Public: Submit contact form
router.post('/', async (req, res) => {
  try {
    const msg = await Contact.create(req.body);

    try {
      await transporter.sendMail({
        from: `"Little Sunshine Website" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Message: ${msg.subject || 'General Inquiry'}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${msg.name}</p>
          <p><strong>Email:</strong> ${msg.email}</p>
          <p><strong>Phone:</strong> ${msg.phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${msg.subject || 'General Inquiry'}</p>
          <p><strong>Message:</strong></p>
          <p>${msg.message}</p>
        `
      });
    } catch (emailErr) {
      console.error('Email error:', emailErr.message);
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});

// GET /api/contact - Admin: Get all messages
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ submittedAt: -1 });
    const unread = await Contact.countDocuments({ isRead: false });
    res.json({ success: true, messages, unread });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/contact/:id/read - Admin: Mark as read
router.patch('/:id/read', protect, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json({ success: true, message: msg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/contact/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
