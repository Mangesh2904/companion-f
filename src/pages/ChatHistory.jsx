import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader, MessageSquare, User, Bot } from 'lucide-react';

const API_URL = 'http://localhost:5000';

export default function ChatHistory() {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/chatbot/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }
      const data = await response.json();
      setChatHistory(data.history);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 p-8 relative flex flex-col"
    >
      <Link to="/" className="absolute top-4 left-4 text-blue-600 dark:text-blue-400 hover:underline flex items-center">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Chat History</h1>

      <div className="flex-grow overflow-auto">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-red-500 mb-4 text-center"
              >
                Error: {error}
              </motion.div>
            )}
          </AnimatePresence>
          {isLoading ? (
            <div className="text-center text-gray-600 dark:text-gray-300 flex items-center justify-center">
              <Loader className="w-6 h-6 animate-spin mr-2" />
              Loading chat history...
            </div>
          ) : chatHistory.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 dark:text-gray-300"
            >
              No chat history available.
            </motion.p>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {chatHistory.map((chat, index) => (
                  <motion.div
                    key={chat._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                  >
                    <div className="flex items-center mb-2">
                      <User className="w-5 h-5 mr-2 text-blue-500" />
                      <p className="font-bold text-gray-800 dark:text-white">User:</p>
                    </div>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">{chat.userMessage}</p>
                    <div className="flex items-center mb-2">
                      <Bot className="w-5 h-5 mr-2 text-green-500" />
                      <p className="font-bold text-gray-800 dark:text-white">Bot:</p>
                    </div>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">{chat.botResponse}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      <span>{new Date(chat.createdAt).toLocaleString()}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}