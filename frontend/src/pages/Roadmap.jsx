import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Loader } from 'lucide-react'
import RoadmapBlock from '../components/RoadmapBlock'

const Roadmap = () => {
  const [topic, setTopic] = useState('')
  const [weeks, setWeeks] = useState('')
  const [roadmap, setRoadmap] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateRoadmap = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:5000/api/roadmap/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ topic, weeks: parseInt(weeks) }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate roadmap')
      }

      const data = await response.json()
      if (!Array.isArray(data.roadmap)) {
        throw new Error('Invalid roadmap format received from server')
      }

      setRoadmap(data.roadmap)
    } catch (error) {
      console.error('Error generating roadmap:', error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const addToChecklist = async (content) => {
    try {
      const response = await fetch('http://localhost:5000/api/checklist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content, type: 'roadmap' }),
      })

      if (!response.ok) {
        throw new Error('Failed to add to checklist')
      }

      // You can add a success message here if needed
    } catch (error) {
      console.error('Error adding to checklist:', error)
    }
  }

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
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Which Roadmap Should I Create For You?</h1>

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
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          {isLoading && (
            <div className="text-center text-gray-600 dark:text-gray-300 flex items-center justify-center">
              <Loader className="w-6 h-6 animate-spin mr-2" />
              Generating roadmap...
            </div>
          )}
          <AnimatePresence>
            {roadmap && Array.isArray(roadmap) && roadmap.length > 0 ? (
              roadmap.map((week, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <RoadmapBlock
                    week={week.weekNumber}
                    topic={week.topic}
                    learningObjectives={week.learningObjectives}
                    resources={week.resources}
                    practiceExercises={week.practiceExercises}
                    onAddToChecklist={() => addToChecklist(week.topic)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-600 dark:text-gray-300"
              >
                {roadmap ? 'No roadmap data available.' : 'Generate a roadmap to see the content here.'}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto w-full"
      >
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic"
            className="flex-grow p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="number"
            value={weeks}
            onChange={(e) => setWeeks(e.target.value)}
            placeholder="Weeks"
            className="w-full sm:w-24 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="1"
          />
          <button
            onClick={generateRoadmap}
            className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Roadmap'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Roadmap