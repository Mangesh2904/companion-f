import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Menu, LogIn, LogOut } from 'lucide-react'

export default function Navbar({ setIsSidebarOpen, isLoggedIn, setIsLoggedIn }) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="mr-2 p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open sidebar</span>
            </button>
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">EduNova</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/roadmap" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Roadmap
            </Link>
            <Link to="/chatbot" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Chatbot
            </Link>
            <Link to="/checklist" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Checklist
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  localStorage.removeItem('token')
                  setIsLoggedIn(false)
                }}
                className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/login">
                <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}