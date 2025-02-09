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