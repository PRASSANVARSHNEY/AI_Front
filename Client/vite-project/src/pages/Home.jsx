import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="homepage">
      <header className="header">
        <h1 className="website-name">AI Evaluation</h1>
        <nav className="nav">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/Register" className="nav-link">Sign Up</Link>
        </nav>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <h2 className="hero-title">Revolutionize Learning with AI-Powered Evaluation</h2>
          <p className="hero-description">
            Discover how AI Evaluation helps educators assess student performance with precision. Join us in advancing the education experience with powerful AI tools.
          </p>
          <Link to="/Register" className="cta-button">Get Started</Link>
        </section>
      </main>
    </div>
  );
}
