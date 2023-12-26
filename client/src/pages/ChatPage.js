import React, { useEffect, useState } from 'react';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './chatpage.css';
import { getChats, sendChat } from '../helper/helper';

const ChatPage = () => {
  const [chat, setChat] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const chats = await getChats();
      setChatHistory(chats);
    };
  
    fetchData();
  }, []);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await sendChat(chat);

    const userMessage = { role: 'user', content: chat.trim() };
    setChatHistory(prev => [...prev, userMessage]);

    const botMessage = { role: 'bot', content: response.translatedText };
    setChatHistory(prev => [...prev, botMessage]);

    setIsLoading(false);
    setChat('');
  };

  return (
    <div className='page'>
      <ToastContainer />
      
      <div className='pageH'> 
        <div className="chat-container">
          {chatHistory.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          )}
        </div>
        <div className="input">
          <form onSubmit={handleChatSubmit}>
            <input
              type="text"
              placeholder="Enter your Querries ..."
              value={chat}
              onChange={(e) => setChat(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
