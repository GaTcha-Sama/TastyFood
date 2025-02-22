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