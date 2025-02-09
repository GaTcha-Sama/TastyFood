import { createContext } from 'react';
import { UserData } from "./pages/Login";


export type User = {
    isConnected: boolean,
    logIn: (data: UserData) => void,
    logOut: () => void
}

export const AuthContext = createContext<User | undefined>(undefined);