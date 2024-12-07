const express = require('express');
const router = express.Router();
const { createBooking, getBookings, cancelBooking} = require('../controllers/bookingController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, createBooking);
router.get('/', authenticate, getBookings);
router.delete('/:id', authenticate, cancelBooking);

module.exports = router;