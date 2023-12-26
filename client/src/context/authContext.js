import React, { createContext, useContext, useState,useEffect } from 'react';
import { Login, Logout, Singup } from '../helper/helper';
import Cookies from 'js-cookie';


// Create a context
const AuthContext = createContext();

// Create a context provider
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setIsAuthenticated(true);
      setUser(token);
    }

    }
, []);


  const login = async(email,password) => {
    
    const data = await Login(email,password);
    console.log("from auth lofin",data);
    
    if(data){
        setIsAuthenticated(true);
        setUser(data.user);
    }
    return data.user;
  };

  const signup =async (username,email,password) => {
    const data = await Singup(username,email,password);
    console.log("from auth",data.newUser);
    
    if(data){
        setIsAuthenticated(true);
        setUser(data.newUser);
    }
    // setUser(userData);
    return data.newUser;
  };

  const logout = () => {
    const logginof =  Logout();
    if(logginof){
      setIsAuthenticated(false);
      setUser(null);

    }
    
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user,login ,signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };