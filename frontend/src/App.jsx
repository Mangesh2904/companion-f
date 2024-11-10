import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, MessageCircle, CheckSquare, Home as HomeIcon, Menu, LogIn, LogOut } from 'lucide-react'

// Importing components and pages
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ChatbotFloater from './components/ChatbotFloater'
import Home from './pages/Home'
import Roadmap from './pages/Roadmap'
import Chatbot from './pages/Chatbot'
import Checklist from './pages/Checklist'
import ChatHistory from './pages/ChatHistory'
import RoadmapHistory from './pages/RoadmapHistory'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 text-gray-900 dark:text-gray-100">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className="pt-16 px-4 md:px-8 lg:px-16 transition-all duration-300 ease-in-out">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Home />
                </motion.div>
              } />
              <Route path="/roadmap" element={
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Roadmap />
                </motion.div>
              } />
              <Route path="/chatbot" element={
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Chatbot />
                </motion.div>
              } />
              <Route path="/checklist" element={
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Checklist />
                </motion.div>
              } />
              <Route path="/chat-history" element={<ChatHistory />} />
              <Route path="/roadmap-history" element={<RoadmapHistory />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </AnimatePresence>
        </main>
        <ChatbotFloater />
      </div>
    </Router>
  )
}