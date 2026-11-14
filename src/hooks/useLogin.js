import { useMutation } from '@tanstack/react-query'
import { login } from '../services/login.js'

function useLogin(options) {
  return useMutation({ mutationFn: login, ...options })
}

export default useLogin
