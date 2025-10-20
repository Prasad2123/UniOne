import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const Chatbot = ({ position = 'bottom-right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm UniOne AI, here to help you with your academic questions. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage) => {
    const responses = [
      "That's a great question! Let me help you with that.",
      "I understand you're looking for help with that topic. Here's what I can tell you...",
      "Based on your question, I recommend checking the relevant study materials.",
      "I'm here to help! Could you provide more specific details about what you're looking for?",
      "That's an interesting topic! Let me search for the most relevant information for you.",
      "I'm UniOne AI, designed to help students with their academic journey. What specific subject are you studying?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40`}>
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white dark:bg-primary-800 rounded-2xl shadow-2xl border border-primary-200 dark:border-primary-700 animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-primary-200 dark:border-primary-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-primary-900 dark:text-primary-50">UniOne AI</h3>
                <p className="text-xs text-primary-500 dark:text-primary-400">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 h-64">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl ${
                    message.isBot
                      ? 'bg-primary-100 dark:bg-primary-700 text-primary-900 dark:text-primary-50'
                      : 'bg-accent-500 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-primary-100 dark:bg-primary-700 text-primary-900 dark:text-primary-50 px-3 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-primary-200 dark:border-primary-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-primary-50 dark:bg-primary-700 border border-primary-200 dark:border-primary-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 text-primary-900 dark:text-primary-50 placeholder-primary-500 dark:placeholder-primary-400"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-accent-500 hover:bg-accent-600 text-white rounded-xl transition-colors duration-200"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-accent-500 hover:bg-accent-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default Chatbot;


