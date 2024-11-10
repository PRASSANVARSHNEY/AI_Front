import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { toast } from 'react-hot-toast'; // Import toast for notifications

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

    // Simple front-end validation
    if (!name || !email || !password) {
      toast.error('All fields are required.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    try {
      // Show a loading toast
      toast.loading('Registering user...');
      const response = await axios.post('http://localhost:5000/api/register', data);

      // Handle success
      toast.dismiss(); // Dismiss the loading toast
      toast.success('Registration successful!');
      console.log('User registered successfully:', response.data);

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      // Handle error
      toast.dismiss(); // Dismiss the loading toast
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={registerUser} className="register-form">
        <h2 className="title">Create Account</h2>
        <p className="subtitle">Join us and start your journey</p>

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

        <button type="submit" className="register-button">
          Sign Up
        </button>
        <p className="login-text">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
}
