import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BookEvent = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const { isAuthenticated, user } = useContext(AuthContext);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      alert('Please log in to book an event.');
      return;
    }
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post('http://localhost:8000/api/bookings', 
        { event: id, bookingDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Booking successful!');
    } catch (error) {
      setMessage('Error booking event');
      console.error('Error booking event:', error);
    }
  };

  return (
    <div>
      <h1>Book Event</h1>
      <div>
        <label htmlFor="bookingDate">Select Date:</label>
        <input
          type="date"
          id="bookingDate"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
        />
      </div>
      <button onClick={handleBooking} className="btn btn-primary">Book Event</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookEvent;