import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
import { AuthProvider } from "./AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Recipes } from "./pages/Recipes";
import { Login } from "./pages/Login";
import { Favorites } from "./pages/Favorites";
import { Error } from "./pages/Error";
import App from "./App";

export const Router = () => {
    const router = createBrowserRouter([
        {
        path: '/',
        element: <App />,
        errorElement: (
            <>
                Page not found <Link to="/">Home</Link>
            </>
        ),

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
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
])  

  return (
    <AuthProvider isSignedIn={false}>
        <RouterProvider router={router} />
    </AuthProvider>
  )
};