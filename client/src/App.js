// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Firstpage from './pages/Firstpage';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { useAuth } from './context/authContext';
import Cookies from 'js-cookie';
import ChatPage from './pages/ChatPage';
import LogoutSuccess from './pages/LogoutPage';
import ProfilePage from './pages/ProfilePage';

// Assuming 'response' contains the access token after login


function App() {
  const { isAuthenticated, user} = useAuth();
  console.log(isAuthenticated)
  // console.log(user)
  const accessToken = Cookies.get();
  const cookies = document.cookie.split('; ');

  // const isAuthenticate = document.cookie.includes('authToken=');

  // console.log("checking ",isAuthenticate);
  console.log("checking ",user);

  return (
    <Router>
      <div >
        <Navbar/>
        <Routes>
        <Route path="/" exact element={<Firstpage />}/>
        <Route path="/signup" exact element={<Signup/>}/>
        <Route path="/login" exact element={<Login />}/>
        <Route path="/chats" exact element={<ChatPage />}/>
        <Route path="/logout" exact element={<LogoutSuccess />}/>
        <Route path="/profile" exact element={<ProfilePage />}/>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
