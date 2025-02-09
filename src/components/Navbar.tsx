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
              to="/recipes" 
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300"
            >
              Recipes
            </Link>

            {isConnected && (
              <Link 
                to="/favorites" 
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300"
              >
                Favorites
              </Link>
            )}

            {isConnected ? (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-300"
              >
                Login
              </Link>
            )}

          </div>
        </div>
      </div>
    </nav>
  )
}
