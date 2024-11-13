import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { toast } from 'react-hot-toast'; // For notifications

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;

    // Frontend validation
    if (!name || !email || !password) {
      toast.error('All fields are required.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    try {
      toast.loading('Registering user...');
      const response = await axios.post('http://localhost:5000/api/register', data);

      // Success
      toast.dismiss(); // Dismiss loading
      toast.success('Registration successful!');
      console.log('User registered:', response.data);

      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      toast.dismiss(); // Dismiss loading
      if (error.response) {
        console.error('Response error:', error.response.data);
        toast.error(error.response.data.message || 'Registration failed.');
      } else if (error.request) {
        console.error('Request error:', error.request);
        toast.error('Server did not respond. Please try again.');
      } else {
        console.error('Error:', error.message);
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={registerUser} className="register-form">
        <h2>Create Account</h2>
        <p>Join us and start your journey</p>

        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter a secure password"
            required
          />
        </div>

        <button type="submit" className="register-button">Sign Up</button>
        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
}
