const express = require('express');
const router = express.Router();
const Waitlist = require('../models/Waitlist');
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');

// GET /api/admin/stats - Dashboard statistics
router.get('/stats', protect, async (req, res) => {
  try {
    const totalWaitlist = await Waitlist.countDocuments();
    const pendingWaitlist = await Waitlist.countDocuments({ status: 'Pending' });
    const enrolledCount = await Waitlist.countDocuments({ status: 'Enrolled' });
    const unreadMessages = await Contact.countDocuments({ isRead: false });

    const programBreakdown = await Waitlist.aggregate([
      { $group: { _id: '$programType', count: { $sum: 1 } } }
    ]);

    const recentWaitlist = await Waitlist.find().sort({ submittedAt: -1 }).limit(5);
    const recentMessages = await Contact.find().sort({ submittedAt: -1 }).limit(5);

    res.json({
      success: true,
      stats: {
        totalWaitlist,
        pendingWaitlist,
        enrolledCount,
        unreadMessages,
        programBreakdown,
        recentWaitlist,
        recentMessages
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
