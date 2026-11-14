import { use } from 'react'
import AuthContext from '../context/authContext.js'

function useAuth() {
  return use(AuthContext)
}

export default useAuth
