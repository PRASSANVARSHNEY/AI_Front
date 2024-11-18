import React from 'react';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>

      {/* Box Container for AI Generator and AI Checker */}
      <div className="box-container">
        {/* AI Generator Box */}
        <div className="box ai-generator-box">
          <h3>AI Generator</h3>
          <p>Explore AI-powered content generation tools that can create articles, blogs, and much more automatically.</p>
          <a href="/ai-generator" className="cta-button">Get Started</a>
        </div>

        {/* AI Checker Box */}
        <div className="box ai-checker-box">
          <h3>AI Checker</h3>
          <p>Analyze and validate AI-generated content for accuracy, originality, and quality.</p>
          <a href="/ai-checker" className="cta-button">Check Now</a>
        </div>
      </div>
    </div>
  );
}
