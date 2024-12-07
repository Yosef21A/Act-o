import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { isAuthenticated, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!isAuthenticated) {
        return;
      }
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:8000/api/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [isAuthenticated]);

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.delete(`http://localhost:8000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  return (
    <div>
      <h1>My Bookings</h1>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            <h3>{booking.event.title}</h3>
            <p>{booking.event.description}</p>
            <button onClick={() => handleCancelBooking(booking._id)} className="btn btn-danger">Cancel Booking</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;