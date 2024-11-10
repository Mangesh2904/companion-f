import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, MessageCircle, BookOpen, CheckSquare, X } from 'lucide-react'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  }

  const linkVariants = {
    hover: { scale: 1.05, x: 10 },
    tap: { scale: 0.95 },
  }

  return (
    <motion.div 
      className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-50"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <button 
        onClick={() => setIsOpen(false)} 
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition duration-300"
      >
        <X className="w-6 h-6" />
      </button>
      <nav className="mt-16 p-4">
        <motion.div
          variants={linkVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Link to="/" className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition duration-300">
            <Home className="w-5 h-5 mr-3" />
            Home
          </Link>
        </motion.div>
        <motion.div
          variants={linkVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Link to="/chat-history" className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition duration-300">
            <MessageCircle className="w-5 h-5 mr-3" />
            Chat History
          </Link>
        </motion.div>
        <motion.div
          variants={linkVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Link to="/roadmap-history" className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition duration-300">
            <BookOpen className="w-5 h-5 mr-3" />
            Roadmap History
          </Link>
        </motion.div>
        <motion.div
          variants={linkVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Link to="/checklist" className="flex items-center py-2 px-4 rounded hover:bg-gray-700 transition duration-300">
            <CheckSquare className="w-5 h-5 mr-3" />
            Checklist
          </Link>
        </motion.div>
      </nav>
    </motion.div>
  )
}

export default Sidebar