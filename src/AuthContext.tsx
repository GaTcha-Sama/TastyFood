/**
 * AuthContext - Authentication context for the application
 * Provides global state management for user authentication and favorites
 * Types and interfaces:
 * - Recipe: Defines structure for recipe data
 *   - Basic recipe information (id, name, description)
 *   - Image URL for thumbnail
 * - User: Defines user authentication state and methods
 *   - Connection status tracking
 *   - Favorites management
 *   - Authentication methods (login/logout)
 * Features:
 * - Type-safe context with TypeScript
 * - Centralized state management for user session
 * - Favorites list management functionality
 * - Integration with React's Context API
 */

import { createContext } from 'react';
import { UserData } from "./pages/Login";

export type Recipe = {
  id: number;
  name: string;
  description: string | null;
  thumbnail_url: string;
}

export type User = {
    isConnected: boolean;
    favorites: Recipe[];
    logIn: (data: UserData) => void;
    logOut: () => void;
    addToFavorites: (recipe: Recipe) => void;
    removeFromFavorites: (recipeId: number) => void;
}

export const AuthContext = createContext<User | undefined>(undefined);