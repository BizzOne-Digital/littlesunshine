const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  // Parent/Guardian Info
  parentName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, trim: true },

  // Child Info
  childName: { type: String, required: true, trim: true },
  childDOB: { type: Date, required: true },
  childGender: { type: String, enum: ['Male', 'Female', 'Prefer not to say'] },

  // Program Info
  programType: {
    type: String,
    required: true,
    enum: ['Infant', 'Toddler', 'Preschool', 'School Age']
  },
  scheduleType: {
    type: String,
    required: true,
    enum: ['Full Time', 'Part Time', 'Daily Drop-in']
  },
  desiredStartDate: { type: Date },
  additionalNotes: { type: String, trim: true },

  // Status
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Enrolled', 'Waitlisted', 'Declined'],
    default: 'Pending'
  },
  adminNotes: { type: String },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Waitlist', waitlistSchema);
