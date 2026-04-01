import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router'

const ProtectedRoute = ({children , roleRequired}) => {

   const {user , token } = useAuth()

   if(!token || user) {
    return <Navigate to='/connexion' replace />
   }

   


  return children
}

export default ProtectedRoute
