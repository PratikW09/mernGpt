import React from 'react';
import './Firstpage.css';

const Firstpage = () => {
    return (
        <div className="landing-container">
            <div className="header">
                <h1>Welcome to ChatGPT</h1>
                <p>Your ultimate chat solution</p>
            </div>
            <div className="features">
                <h2>Features</h2>
                <ul>
                    <li>Fast and Reliable</li>
                    <li>Secure Messaging</li>
                    <li>AI-Powered Chat</li>
                    <li>Easy to Use</li>
                </ul>
            </div>
            <div className="cta">
                <button className="btn-primary">Get Started</button>
            </div>
        </div>
    );
}

export default Firstpage;
