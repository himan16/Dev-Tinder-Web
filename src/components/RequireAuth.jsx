import { Navigate, Outlet } from 'react-router'
import useAuth from '../hooks/useAuth.js'

function RequireAuth() {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}

export default RequireAuth
