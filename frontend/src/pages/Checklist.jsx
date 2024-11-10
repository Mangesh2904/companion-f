import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000';

const Checklist = () => {
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChecklist();
  }, []);

  const fetchChecklist = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/checklist`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch checklist');
      }
      const data = await response.json();
      setChecklist(data.checklist);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/checklist/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newItem })
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const data = await response.json();
      setChecklist([...checklist, data.item]);
      setNewItem('');
    } catch (error) {
      console.error('Add item error:', error);
      setError(error.message);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/checklist/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      setChecklist(checklist.filter(item => item._id !== id));
    } catch (error) {
      console.error('Remove item error:', error);
      setError(error.message);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/checklist/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ completed: !completed })
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      setChecklist(checklist.map(item =>
        item._id === id ? { ...item, completed: !item.completed } : item
      ));
    } catch (error) {
      console.error('Update item error:', error);
      setError(error.message);
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
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Checklist</h1>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </motion.div>
      )}

      <form onSubmit={addItem} className="mb-4 flex">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
          className="flex-grow p-2 border rounded-l dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-300 ease-in-out flex items-center"
        >
          <Plus className="w-5 h-5 mr-1" />
          Add
        </button>
      </form>

      {isLoading ? (
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto" />
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading checklist...</p>
        </div>
      ) : (
        <AnimatePresence>
          {checklist.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-2 flex items-center justify-between"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(item._id, item.completed)}
                  className="mr-3 form-checkbox h-5 w-5 text-blue-600"
                />
                <span className={`${item.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}`}>
                  {item.content}
                </span>
              </div>
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default Checklist;