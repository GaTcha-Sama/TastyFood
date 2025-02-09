import { useContext } from "react";
import { AuthContext, User } from "../AuthContext";


export const useAuthContext = ():User => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }


    return context;
}