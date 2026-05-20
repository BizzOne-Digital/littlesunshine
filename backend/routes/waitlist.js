const express = require('express');
const router = express.Router();
const Waitlist = require('../models/Waitlist');
const { protect } = require('../middleware/auth');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// POST /api/waitlist - Public: Submit waitlist form
router.post('/', async (req, res) => {
  try {
    const entry = await Waitlist.create(req.body);

    // Send confirmation email to parent
    try {
      await transporter.sendMail({
        from: `"Little Sunshine ELC" <${process.env.EMAIL_USER}>`,
        to: entry.email,
        subject: 'Waitlist Application Received - Little Sunshine ELC',
        html: `
          <h2>Thank you, ${entry.parentName}!</h2>
          <p>We have received your waitlist application for <strong>${entry.childName}</strong>.</p>
          <p><strong>Program:</strong> ${entry.programType} - ${entry.scheduleType}</p>
          <p>Our team will contact you within 2-3 business days.</p>
          <p>If you have any questions, please call us at <strong>306-750-0848</strong> or email <strong>littlesunshineelc23@gmail.com</strong></p>
          <br/>
          <p>Warm regards,<br/>Little Sunshine Early Learning Centre Team</p>
        `
      });

      // Notify admin
      await transporter.sendMail({
        from: `"Little Sunshine Website" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Waitlist Application - ${entry.childName}`,
        html: `
          <h2>New Waitlist Application</h2>
          <p><strong>Parent:</strong> ${entry.parentName}</p>
          <p><strong>Child:</strong> ${entry.childName}</p>
          <p><strong>Program:</strong> ${entry.programType} - ${entry.scheduleType}</p>
          <p><strong>Email:</strong> ${entry.email}</p>
          <p><strong>Phone:</strong> ${entry.phone}</p>
          <p>Login to admin panel to view full details.</p>
        `
      });
    } catch (emailErr) {
      console.error('Email error:', emailErr.message);
    }

    res.status(201).json({ success: true, message: 'Waitlist application submitted successfully!', id: entry._id });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: Object.values(err.errors).map(e => e.message).join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/waitlist - Admin: Get all entries
router.get('/', protect, async (req, res) => {
  try {
    const { status, program, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (program) filter.programType = program;

    const entries = await Waitlist.find(filter)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Waitlist.countDocuments(filter);
    res.json({ success: true, entries, total, pages: Math.ceil(total / limit), currentPage: page });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/waitlist/:id - Admin: Update status
router.patch('/:id', protect, async (req, res) => {
  try {
    const entry = await Waitlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) return res.status(404).json({ success: false, message: 'Entry not found' });
    res.json({ success: true, entry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/waitlist/:id - Admin: Delete entry
router.delete('/:id', protect, async (req, res) => {
  try {
    await Waitlist.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
