import { ReactNode, useState } from 'react';
import { UserData } from "./pages/Login";
import { AuthContext } from './AuthContext';

type AuthProviderProps = {
    children: ReactNode;
    isSignedIn?: boolean;
}

export const AuthProvider = ({children, isSignedIn}:AuthProviderProps) => {
    const [isConnected, setIsConnected] = useState(isSignedIn || false);

    const logIn = ({email, password}:UserData) => {
        if(email === import.meta.env.USER_EMAIL && password === import.meta.env.PASSWORD_DATA) {
            setIsConnected(true);
        }
    }




    const logOut = () => {
        setIsConnected(false);
    }

    return (
        <AuthContext.Provider value={{ isConnected, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}
