import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEvent = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/events/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      await axios.put(`http://localhost:8000/api/events/${id}`, 
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Event updated successfully!');
      navigate('/events'); // Navigate to the events list
    } catch (error) {
      setMessage('Error updating event');
      console.error('Error updating event:', error);
    }
  };

  return (
    <div>
      <h1>Edit Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Event</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditEvent;