// routes/registrationRoutes.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const Registration = require('../models/Registration');

// POST /api/registrations
// Create a new registration
router.post('/', async (req, res) => {
  try {
    const { conferenceName, participantName, email } = req.body;

    if (!conferenceName || !participantName || !email) {
      return res.status(400).json({ message: 'conferenceName, participantName and email are required' });
    }

    // generate unique registrationId (you can customize format)
    const registrationId = uuidv4();

    const newReg = new Registration({
      registrationId,
      conferenceName,
      participantName,
      email,
      status: 'registered'
    });

    await newReg.save();
    res.status(201).json({ message: 'Registration created', registrationId, registration: newReg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/registrations/:registrationId
// Get registration by ID
router.get('/:registrationId', async (req, res) => {
  try {
    const { registrationId } = req.params;
    const reg = await Registration.findOne({ registrationId }).lean();
    if (!reg) return res.status(404).json({ message: 'Registration not found' });
    res.json(reg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/registrations/:registrationId
// Delete (or mark cancelled) by ID
router.delete('/:registrationId', async (req, res) => {
  try {
    const { registrationId } = req.params;

    // Option A: physically delete
    const deleted = await Registration.findOneAndDelete({ registrationId });
    if (!deleted) return res.status(404).json({ message: 'Registration not found' });

    // Option B: if you'd rather mark cancelled, use findOneAndUpdate({registrationId}, {status: 'cancelled'})
    res.json({ message: 'Registration deleted', registrationId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
