import React, { useState } from 'react';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import './index.css'; // Additional custom styles if needed

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [userInput, setUserInput] = useState('');

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setMessages([...messages, { sender: 'user', text: userInput }]);
      setUserInput('');
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: 'bot', text: 'This is a dummy response!' }]);
      }, 1000);
    }
  };

  return (
    <div className="chatbot-container">
      <Button
        icon="pi pi-comments"
        className="p-button-rounded p-button-primary chat-icon"
        onClick={toggleChatbot}
      />
      {isOpen && (
        <div className="chatbot-window p-shadow-3 p-d-flex p-flex-column bg-gray-100 p-2">
          <div className="chatbot-header p-p-2 p-d-flex p-jc-between p-ai-center p-shadow-1">
            <h4 className="p-m-0">Chatbot</h4>
            <Button icon="pi pi-times" className="p-button-text" onClick={toggleChatbot} />
          </div>
          <div className="chatbot-messages p-p-3 p-d-flex p-flex-column p-gap-2 p-overflow-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message p-p-2 p-border-round ${
                  msg.sender === 'bot'
                    ? 'p-d-flex p-jc-start p-ai-center p-bg-gray-200'
                    : 'p-d-flex p-jc-end p-ai-center p-text-white p-bg-primary'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input p-p-2 p-d-flex p-ai-center p-gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message..."
              className="p-inputtext p-p-2 p-border-round p-flex-1"
            />
            <Button icon="pi pi-send" className="p-button-primary" onClick={handleSendMessage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
