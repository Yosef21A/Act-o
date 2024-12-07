import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'; // Adjust the import path
import './Auth.css'; // Import custom CSS

const Signup = () => {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate(); // To redirect after successful signup
  const { login } = useContext(AuthContext); // Get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      first_name,
      last_name,
      email,
      password,
      phone_number,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        payload,
        {
          withCredentials: true, // Include cookies in the request
        }
      );
  
      console.log("Backend Response:", response);
  
      if (response.status === 200) {
        const { token, msg, user } = response.data; // Destructure the response
  
        console.log("Token:", token);
        console.log("Message:", msg);
        console.log("User:", user);
  
        // Store the token in localStorage
        if (token) {
          login(token); // Update authentication state
          navigate("/dashboard"); // Redirect to the dashboard
        }
      }
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors(["Sign-up failed! Please try again."]);
      }
      console.error("Error during signup:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create an Account</h2>
        {errors.length > 0 && (
          <div className="error-message">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Phone Number"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;