import './App.css'
import { Navbar } from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        TASTY FOOD
        <Navbar />        
      </div>
      <Outlet />
    </>
  )
}

export default App
