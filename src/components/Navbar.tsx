/**
 * Navbar component - Application navigation header
 * A responsive React component that provides main navigation functionality
 * Features:
 * - Dynamic navigation links based on authentication state:
 *   - Home, Recipes for all users
 *   - Favorites, Logout for authenticated users
 *   - Login, Signup for non-authenticated users
 * - Responsive design:
 *   - Full menu on desktop
 *   - Hamburger menu on mobile with smooth transitions
 * - Visual feedback:
 *   - Active link highlighting
 *   - Hover effects
 * - Authentication integration:
 *   - Uses AuthContext for user state
 *   - Handles logout functionality
 * - Styled with Tailwind CSS:
 *   - Consistent theming
 *   - Smooth animations
 *   - Mobile-first approach
 */

import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const { isConnected, logOut } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logOut()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold text-amber-800 font-serif"
          >
            Tasty
          </Link>

          
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </Link>
            <Link 
              to="/recipes" 
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" />
              </svg>
              Recipes
            </Link>

            {isConnected && (
              <Link 
                to="/favorites" 
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                Favorites
              </Link>
            )}

            {isConnected ? (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                </svg>
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" />
                </svg>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
