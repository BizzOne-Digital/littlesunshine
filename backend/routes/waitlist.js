const express = require('express');
const router = express.Router();
const Waitlist = require('../models/Waitlist');
const { protect } = require('../middleware/auth');
const nodemailer = require('nodemailer');

const getTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// POST /api/waitlist - Public: Submit waitlist form
router.post('/', async (req, res) => {
  try {
    const entry = await Waitlist.create(req.body);

    try {
      const transporter = getTransporter();

      // 1. Confirmation email TO PARENT
      await transporter.sendMail({
        from: `"Little Sunshine ELC" <${process.env.EMAIL_USER}>`,
        to: entry.email,
        replyTo: process.env.EMAIL_USER,
        subject: 'Waitlist Application Received - Little Sunshine ELC',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #D12B2B; padding: 20px; border-radius: 10px 10px 0 0; text-align:center;">
              <h1 style="color:white; margin:0; font-size:22px;">Little Sunshine ELC</h1>
              <p style="color:rgba(255,255,255,0.85); margin:6px 0 0;">Early Learning Centre</p>
            </div>
            <div style="background:#fff; padding:30px; border:1px solid #eee; border-radius: 0 0 10px 10px;">
              <h2 style="color:#2D7A3A;">Application Received!</h2>
              <p>Dear <strong>${entry.parentName}</strong>,</p>
              <p>We have received your waitlist application for <strong>${entry.childName}</strong>.</p>
              <table style="width:100%; border-collapse:collapse; margin:20px 0;">
                <tr style="background:#f9f9f9;"><td style="padding:10px; border:1px solid #eee;"><strong>Child Name</strong></td><td style="padding:10px; border:1px solid #eee;">${entry.childName}</td></tr>
                <tr><td style="padding:10px; border:1px solid #eee;"><strong>Program</strong></td><td style="padding:10px; border:1px solid #eee;">${entry.programType} - ${entry.scheduleType}</td></tr>
                ${entry.desiredStartDate ? `<tr style="background:#f9f9f9;"><td style="padding:10px; border:1px solid #eee;"><strong>Desired Start Date</strong></td><td style="padding:10px; border:1px solid #eee;">${new Date(entry.desiredStartDate).toLocaleDateString()}</td></tr>` : ''}
              </table>
              <p>Our team will contact you within <strong>2-3 business days</strong>.</p>
              <p>Questions? Call us at <strong>306-750-0848</strong></p>
              <br/>
              <p style="color:#888; font-size:13px;">Warm regards,<br/><strong>Little Sunshine Early Learning Centre</strong></p>
            </div>
          </div>
        `
      });

      // 2. Notification email TO ADMIN
      // Gmail always shows authenticated account name as sender
      // So we put parent info clearly in SUBJECT and top of email body
      await transporter.sendMail({
        from: `"Little Sunshine Website" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        replyTo: `"${entry.parentName}" <${entry.email}>`,
        subject: `📋 ${entry.parentName} — New Waitlist (${entry.programType})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #2D7A3A; padding: 16px 20px; border-radius: 10px 10px 0 0;">
              <h2 style="color:white; margin:0; font-size:18px;">📋 New Waitlist Application</h2>
            </div>
            <div style="background:#fff; padding:24px; border:1px solid #eee; border-radius: 0 0 10px 10px;">

              <div style="background:#E8F5EA; border-left:4px solid #2D7A3A; padding:14px 16px; border-radius:0 8px 8px 0; margin-bottom:20px;">
                <p style="margin:0; font-size:18px; font-weight:bold; color:#1A1A1A;">${entry.parentName}</p>
                <p style="margin:4px 0 0; color:#2D7A3A; font-size:14px;">${entry.email} &nbsp;|&nbsp; ${entry.phone}</p>
              </div>

              <table style="width:100%; border-collapse:collapse;">
                <tr style="background:#f9f9f9;">
                  <td style="padding:10px 14px; border:1px solid #eee; width:40%;"><strong>Child Name</strong></td>
                  <td style="padding:10px 14px; border:1px solid #eee;">${entry.childName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px; border:1px solid #eee;"><strong>Date of Birth</strong></td>
                  <td style="padding:10px 14px; border:1px solid #eee;">${entry.childDOB ? new Date(entry.childDOB).toLocaleDateString() : 'Not provided'}</td>
                </tr>
                <tr style="background:#f9f9f9;">
                  <td style="padding:10px 14px; border:1px solid #eee;"><strong>Program</strong></td>
                  <td style="padding:10px 14px; border:1px solid #eee;">${entry.programType}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px; border:1px solid #eee;"><strong>Schedule</strong></td>
                  <td style="padding:10px 14px; border:1px solid #eee;">${entry.scheduleType}</td>
                </tr>
                ${entry.desiredStartDate ? `
                <tr style="background:#f9f9f9;">
                  <td style="padding:10px 14px; border:1px solid #eee;"><strong>Start Date</strong></td>
                  <td style="padding:10px 14px; border:1px solid #eee;">${new Date(entry.desiredStartDate).toLocaleDateString()}</td>
                </tr>` : ''}
                ${entry.address ? `
                <tr>
                  <td style="padding:10px 14px; border:1px solid #eee;"><strong>Address</strong></td>
                  <td style="padding:10px 14px; border:1px solid #eee;">${entry.address}</td>
                </tr>` : ''}
                ${entry.additionalNotes ? `
                <tr style="background:#f9f9f9;">
                  <td style="padding:10px 14px; border:1px solid #eee;"><strong>Notes</strong></td>
                  <td style="padding:10px 14px; border:1px solid #eee;">${entry.additionalNotes}</td>
                </tr>` : ''}
              </table>

              <div style="margin-top:20px; padding:12px 16px; background:#FFF8E7; border-radius:8px; border:1px solid #E8B84B;">
                <p style="margin:0; font-size:13px; color:#555;">
                  💬 Hit <strong>Reply</strong> to respond directly to <strong>${entry.parentName}</strong> at <a href="mailto:${entry.email}">${entry.email}</a>
                </p>
              </div>
            </div>
          </div>
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