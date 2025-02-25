/**
 * App component - Root component of the application
 * A React component that serves as the main wrapper for the entire application
 * Features:
 * - Provides authentication context through AuthProvider
 * - Implements basic layout structure with:
 *   - Navigation bar at the top
 *   - Main content area with padding
 * - Uses React Router's Outlet for dynamic content rendering
 * - Applies consistent styling with Tailwind CSS:
 *   - Minimum height for full viewport coverage
 *   - Light gray background
 *   - Responsive container with padding
 */

import { Navbar } from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './AuthProvider'

function App() {

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  )
}

export default App
