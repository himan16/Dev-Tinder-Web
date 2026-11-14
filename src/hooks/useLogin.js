import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LOGGED_IN_USER_QUERY_KEY } from '../constant.js'
import { login } from '../services/login.js'

function useLogin(options) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    ...options,
    onSuccess: (data, ...rest) => {
      // Seed the cache with the user from the response, so no extra /profile/view call is needed.
      queryClient.setQueryData(LOGGED_IN_USER_QUERY_KEY, data.user)
      options?.onSuccess?.(data, ...rest)
    },
  })
}

export default useLogin
