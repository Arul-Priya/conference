// models/Registration.js
const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  registrationId: { type: String, required: true, unique: true },
  conferenceName: { type: String, required: true, trim: true },
  participantName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  status: { type: String, enum: ['registered','cancelled'], default: 'registered' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', RegistrationSchema);
