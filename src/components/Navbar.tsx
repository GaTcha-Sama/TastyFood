import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div>
        <Link to="/login">Login</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/recipes">Recipes</Link>
    </div>
  )
}
