import './App.css'
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
