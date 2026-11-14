import { useState } from 'react'
import AuthContext from './authContext.js'

function AuthProvider({ children }) {
  // Placeholder until login is built: flip to true to view the protected pages.
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <AuthContext value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext>
  )
}

export default AuthProvider
