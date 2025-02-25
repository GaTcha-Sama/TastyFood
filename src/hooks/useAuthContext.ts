/**
 * useAuthContext hook - Authentication context consumer
 * A custom React hook that provides access to the authentication context
 * Features:
 * - Type-safe context consumption:
 *   - Returns User type with authentication state
 *   - Includes isConnected status
 *   - Provides favorites management methods
 * - Error handling:
 *   - Throws descriptive error if used outside AuthProvider
 *   - Ensures proper context usage in component tree
 * - Zero dependencies beyond React core
 * - Simplified access to authentication state and methods
 * - TypeScript integration for enhanced developer experience
 */

import { useContext } from "react";
import { AuthContext, User } from "../AuthContext";

export const useAuthContext = ():User => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}