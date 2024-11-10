import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

export default function LoginForm() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/login', data);
      console.log('Login successful:', response.data);
      // Redirect or handle successful login here
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="title">Welcome Back</h2>
        <p className="subtitle">Please login to continue</p>
        
        {error && <p className="error-message">{error}</p>}
        
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
        <p className="signup-text">Don't have an account? <a href="/Register">Sign up</a></p>
      </form>
    </div>
  );
};
