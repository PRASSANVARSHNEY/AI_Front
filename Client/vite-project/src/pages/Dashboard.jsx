import React from 'react';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <div className="section">
        <h2>AI Generator</h2>
        <p>Explore AI-powered content generation tools.</p>
      </div>
      <div className="section">
        <h2>AI Checker</h2>
        <p>Analyze and validate AI-generated content.</p>
      </div>
    </div>
  );
}
