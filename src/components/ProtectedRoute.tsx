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