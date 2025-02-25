/**
 * AuthProvider component - Authentication state management wrapper
 * A React component that implements the AuthContext provider functionality
 * Features:
 * - Manages user authentication state:
 *   - Connection status (isConnected)
 *   - Favorites list (Recipe[])
 * - Provides authentication methods:
 *   - logIn: Validates credentials against environment variables
 *   - logOut: Clears user session and favorites
 * - Handles favorites management:
 *   - addToFavorites: Prevents duplicate entries
 *   - removeFromFavorites: Filters by recipe ID
 * - Uses React's useState for state management
 * - Integrates with react-hot-toast for notifications
 * - Type-safe implementation with TypeScript
 */

import { ReactNode, useState } from 'react';
import { UserData } from "./pages/Login";
import { AuthContext, Recipe } from './AuthContext';
import toast from 'react-hot-toast';

type AuthProviderProps = {
    children: ReactNode;
    isSignedIn?: boolean;
}

export const AuthProvider = ({children, isSignedIn}:AuthProviderProps) => {
    const [isConnected, setIsConnected] = useState(isSignedIn || false);
    const [favorites, setFavorites] = useState<Recipe[]>([]);

    const logIn = async ({email, password}:UserData) => {
        if(email === import.meta.env.VITE_USER_EMAIL && password === import.meta.env.VITE_USER_PASSWORD) {
            setIsConnected(true);
            return true;
        }
        return false;
    }

    const logOut = () => {
        setIsConnected(false);
        setFavorites([]);
        toast.success('You are disconnected !');
    }

    const addToFavorites = (recipe: Recipe) => {
        setFavorites(prev => {
            if (!prev.some(fav => fav.id === recipe.id)) {
                return [...prev, recipe];
            }
            return prev;
        });
    }

    const removeFromFavorites = (recipeId: number) => {
        setFavorites(prev => prev.filter(recipe => recipe.id !== recipeId));
    }

    return (
        <AuthContext.Provider value={{ 
            isConnected, 
            favorites, 
            logIn, 
            logOut, 
            addToFavorites, 
            removeFromFavorites 
        }}>
            {children}
        </AuthContext.Provider>
    )
}
