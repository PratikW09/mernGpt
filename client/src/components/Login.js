import React, { useState, useEffect } from 'react';
import './Signup.css';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load Google One-Tap script and initialize
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '1081600520235-0c4bimivkl0cl7ko8nbd4o380f9h3teu.apps.googleusercontent.com', // Replace with your client ID
        callback: onSignIn
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const isSuccess = await login(email, password);
    if (isSuccess) {
      navigate('/chats');
    }
  };

  const onSignIn = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    
    // Assuming you have an authentication method for Google Sign-In
    // Call this method to authenticate the user on your backend
    authenticateWithBackend(profile.getIdToken());
  };

  const authenticateWithBackend = async (idToken) => {
    try {
      const response = await fetch('/api/google-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken })
      });

      const data = await response.json();
      if (data.success) {
        navigate('/chats');
      } else {
        console.error('Authentication failed:', data.error);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="signup-container shadow-lg">
      <div className="signup-form-container">
        <h2 className="signup-heading">Login</h2>
        <form className="signup-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
      </div>
      {/* Render Google One-Tap component */}
      <div id="g_id_onload" data-client_id="YOUR_CLIENT_ID.apps.googleusercontent.com" data-callback={onSignIn}></div>
      {/* <a href="#" onClick={signOut}>Sign out</a> */}
    </div>
  );
};

export default Login;
