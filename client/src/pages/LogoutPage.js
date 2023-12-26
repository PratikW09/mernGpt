import React from 'react';
import './LogoutSuccess.css';  // Import custom CSS

const LogoutSuccess = () => {
  return (
    <div className="chatgpt-logout-container">
      <div className="chatgpt-logout-card">
        <div className="chatgpt-logout-content">
          <h2 className="chatgpt-logout-title">Logged Out</h2>
          <p className="chatgpt-logout-text">You've been logged out. Stay safe!</p>
          <a href="/login" className="chatgpt-logout-btn">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogoutSuccess;
