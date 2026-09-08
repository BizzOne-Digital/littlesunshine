const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { protect } = require('../middleware/auth');

// POST /api/reviews - Public: Submit a review
router.post('/', async (req, res) => {
  try {
    const { name, rating, message } = req.body;
    const review = await Review.create({ name, rating, message });
    res.status(201).json({ success: true, message: 'Thank you! Your review has been submitted for approval.', id: review._id });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: Object.values(err.errors).map(e => e.message).join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/reviews/approved - Public: Get approved reviews for website display
router.get('/approved', async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'Approved' }).sort({ submittedAt: -1 });
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/reviews - Admin: Get all reviews
router.get('/', protect, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const reviews = await Review.find(filter).sort({ submittedAt: -1 });
    const total = await Review.countDocuments();
    const pending = await Review.countDocuments({ status: 'Pending' });
    res.json({ success: true, reviews, total, pending });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/reviews/:id - Admin: Update status (Approve/Reject)
router.patch('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    res.json({ success: true, review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/reviews/:id - Admin: Delete review
router.delete('/:id', protect, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
