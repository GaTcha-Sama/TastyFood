/**
 * ProtectedRoute component - Authentication route guard
 * A React component that protects routes requiring authentication
 * Features:
 * - Route protection logic:
 *   - Checks user authentication status via AuthContext
 *   - Redirects to login page if user is not authenticated
 *   - Renders protected content for authenticated users
 * - Implements React Router's Navigate for redirection
 * - Uses TypeScript for type safety:
 *   - Props interface for children components
 *   - Proper typing for context consumption
 * - Seamless integration with React Router v6
 * - Clean implementation with minimal overhead
 */

import { PropsWithChildren } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate } from 'react-router-dom'


export const ProtectedRoute = ({children}:PropsWithChildren) => {
    const {isConnected} = useAuthContext()
  if(!isConnected) {
    return <Navigate to="/" />
  }
  return children
}