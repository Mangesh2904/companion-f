'use client'

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader, Calendar, Clock } from 'lucide-react';

export default function RoadmapHistory() {
  const [roadmapHistory, setRoadmapHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoadmapHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/roadmap/history', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch roadmap history');
        }
        const data = await response.json();
        setRoadmapHistory(data.history);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmapHistory();
  }, []);

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
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Roadmap History</h1>

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
              Loading roadmap history...
            </div>
          ) : roadmapHistory.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 dark:text-gray-300"
            >
              No roadmap history available.
            </motion.p>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {roadmapHistory.map((roadmap, index) => (
                  <motion.div
                    key={roadmap._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                  >
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{roadmap.topic}</h2>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Duration: {roadmap.duration} weeks</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(roadmap.createdAt).toLocaleString()}</span>
                    </div>
                    <Link
                      to={`/roadmap/${roadmap._id}`}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    >
                      View Roadmap
                    </Link>
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