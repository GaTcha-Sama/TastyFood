/**
 * Router component - Application routing configuration
 * A React component that defines the routing structure using React Router
 * Features:
 * - Route definitions:
 *   - Home ('/') - Landing page
 *   - Login ('/login') - Authentication page
 *   - Recipes ('/recipes') - Recipe listing
 *   - Recipe Details ('/recipes/:id') - Individual recipe view
 *   - Favorites ('/favorites') - Protected route for saved recipes
 *   - Error ('*') - 404 page for undefined routes
 * - Protected routes implementation:
 *   - Wraps sensitive routes with ProtectedRoute component
 *   - Ensures authentication before access
 * - Nested routing:
 *   - Uses App component as root layout
 *   - Implements outlet pattern for child routes
 * - Authentication wrapper:
 *   - Provides auth context to all routes
 *   - Manages global authentication state
 */

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./AuthProvider";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Recipes } from "./pages/Recipes";
import { Login } from "./pages/Login";
import { Favorites } from "./pages/Favorites";
import { Error } from "./pages/Error";
import App from "./App";
import { RecipesDetails } from "./pages/RecipesDetails";
import { Home } from "./pages/Home";

export const Router = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/login',
                    element: <Login />,
                },
                {
                    path: '/recipes',
                    element: <Recipes />,
                },
                {
                    path: '/recipes/:id',
                    element: <RecipesDetails />,
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
                }
            ],
        }
    ]);

    return (
        <AuthProvider isSignedIn={false}>
            <RouterProvider router={router} />
        </AuthProvider>
    )
};