import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LOGGED_IN_USER_QUERY_KEY } from '../constant.js'
import { signup } from '../services/signup.js'

function useSignup(options) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signup,
    ...options,
    onSuccess: (data, ...rest) => {
      // The backend sets the session cookie on signup, so the new user is logged in already.
      queryClient.setQueryData(LOGGED_IN_USER_QUERY_KEY, data.user)
      options?.onSuccess?.(data, ...rest)
    },
  })
}

export default useSignup
