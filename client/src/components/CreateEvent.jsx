import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Add state for image
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    console.log('Form Data:', formData);

    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post('http://localhost:8000/api/events', 
        formData,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );
      console.log('Response:', response.data);
      setMessage('Event created successfully!');
      navigate('/events'); // Navigate to the events list
    } catch (error) {
      setMessage('Error creating event');
      console.error('Error creating event:', error);
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
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
        <div>
          <label>Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateEvent;