import React, { useState } from 'react';
import './Register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('User registered with:', { name, email, password });
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
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name" 
            required 
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            required 
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter a secure password" 
            required 
          />
        </div>
        
        <button type="submit" className="register-button">Sign Up</button>
        <p className="login-text">Already have an account? <a href="/login">Log in</a></p>
      </form>
    </div>
  );
}
