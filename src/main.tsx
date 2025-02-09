import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from '../src/pages/Login.tsx'
import { Favorites } from '../src/pages/Favorites.tsx'
import { Recipes } from '../src/pages/Recipes.tsx'
import { Error } from '../src/pages/Error.tsx'
import { ProtectedRoute } from '../src/components/ProtectedRoute.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/recipes',
        element: <Recipes />,
      },
      {
        path: '/favorites',
        element: <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>,
      },      
    ],
  },
])  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
