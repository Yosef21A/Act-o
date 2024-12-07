import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Modal, Button, Form } from 'react-bootstrap';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [commentTexts, setCommentTexts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleLike = async (eventId) => {
    if (!isAuthenticated) {
      alert('Please log in or register to like this event.');
      return;
    }
    try {
      await axios.post(`http://localhost:8000/api/events/${eventId}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
      });
      setEvents(events.map(event => event._id === eventId ? { ...event, likes: [...event.likes, { _id: user._id }] } : event));
    } catch (error) {
      console.error('Error liking event:', error);
    }
  };

  const handleComment = async (eventId) => {
    if (!isAuthenticated) {
      alert('Please log in or register to comment on this event.');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8000/api/events/${eventId}/comment`, { text: commentTexts[eventId] }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
      });
      setEvents(events.map(event => event._id === eventId ? response.data : event));
      setCommentTexts({ ...commentTexts, [eventId]: '' });
    } catch (error) {
      console.error('Error commenting on event:', error);
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setEditTitle(event.title);
    setEditDescription(event.description);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.put(`http://localhost:8000/api/events/${currentEvent._id}`, 
        { title: editTitle, description: editDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvents(events.map(event => event._id === currentEvent._id ? { ...event, title: editTitle, description: editDescription } : event));
      setShowModal(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  // Sort events by the number of likes in descending order
  const sortedEvents = [...events].sort((a, b) => b.likes.length - a.likes.length);

  return (
    <div>
      <h1>Events</h1>
      <Link to="/create-event" className="btn btn-primary mb-3">Create Event</Link>
      <ul>
        {sortedEvents.map(event => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            {event.imageUrl && <img src={`http://localhost:8000${event.imageUrl}`} alt={event.title} style={{ width: '200px', height: 'auto' }} />}
            <button onClick={() => handleLike(event._id)} className="btn btn-secondary ml-3">
              Like ({event.likes.length})
            </button>
            <div>
              <input
                type="text"
                value={commentTexts[event._id] || ''}
                onChange={(e) => setCommentTexts({ ...commentTexts, [event._id]: e.target.value })}
                placeholder="Add a comment"
              />
              <button onClick={() => handleComment(event._id)} className="btn btn-secondary ml-3">Comment</button>
            </div>
            <ul>
              {event.comments.map(comment => (
                <li key={comment._id}>
                  <strong>{comment.user.first_name} {comment.user.last_name}:</strong> {comment.text}
                </li>
              ))}
            </ul>
            {isAuthenticated && event.createdBy === user?._id && (
              <button onClick={() => handleEdit(event)} className="btn btn-secondary ml-3">Edit</button>
            )}
            <button onClick={() => navigate(`/book/${event._id}`)} className="btn btn-primary ml-3">Book Now</button>
          </li>
        ))}
      </ul>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventList;