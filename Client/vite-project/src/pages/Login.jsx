import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { toast } from 'react-hot-toast'; // Import toast for notifications
import { useNavigate } from 'react-router-dom'; // For navigation

export default function LoginForm() {
  const navigate = useNavigate(); // For redirection
  const [data, setData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    // Basic validation
    if (!email || !password) {
      toast.error('Both fields are required.');
      return;
    }

    try {
      // Show loading toast
      toast.loading('Logging in...');
      
      // Send login request to backend
      const response = await axios.post('http://localhost:5000/api/login', data, { withCredentials: true });

      // Handle success
      toast.dismiss(); // Dismiss the loading toast
      toast.success('Login successful!');
      console.log('Login successful:', response.data);

      // Redirect to dashboard or another page
      navigate('/dashboard');
    } catch (err) {
      toast.dismiss(); // Dismiss the loading toast
      
      // Handle error response
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Please login to continue</p>

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
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="login-button">Log In</button>
        <p className="signup-text">Don't have an account? <a href="/register">Sign up</a></p>
      </form>
    </div>
  );
}
