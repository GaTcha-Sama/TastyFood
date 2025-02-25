/**
 * Home component - Landing page of the application
 * A responsive React component that serves as the main entry point
 * Features:
 * - Displays the Tasty logo with a rounded border
 * - Shows welcome headings and descriptive text
 * - Contains a login link with hover effects
 * - Uses Tailwind CSS for styling and centered layout
 * - Implements React Router for navigation
 */

import logo from '../assets/tasty-logo.jpg'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <section className="flex justify-center items-center">
      <div className="flex flex-col items-center">
        <img src={logo} alt="logo" className="border-2 border-amber-100 rounded-full" />
        <h1 className="text-4xl font-bold mt-10">Welcome to Tasty</h1>
        <h2 className="text-2xl font-bold mt-10">Your go-to source for recipes</h2>
        <p className="text-gray-600 mt-5">Find and share recipes from around the world</p>
        <p className="text-gray-600 mt-5">Please <Link to="/login" className="text-amber-600 hover:text-amber-900">login</Link> to get started</p>
      </div>
    </section>
  )
} 