const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking({
      event: req.body.event,
      user: req.user.id,
      bookingDate: req.body.bookingDate,
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user.id.toString()) {
      console.log('Booking user ID:', booking.user.toString());
      console.log('Request user ID:', req.user.id.toString());
      return res.status(403).json({ message: 'You are not authorized to cancel this booking' });
    }
    await booking.deleteOne();
    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error('Error canceling booking:', error);
    res.status(500).json({ message: 'Error canceling booking', error });
  }
};