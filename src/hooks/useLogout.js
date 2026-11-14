import { hashKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { LOGGED_IN_USER_QUERY_KEY } from '../constant.js'
import { logout } from '../services/logout.js'

function useLogout(options) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    ...options,
    onSuccess: (...args) => {
      // Drop every other user's data from the cache, then mark the session as gone.
      // `clear()` would also remove ['devTinder', 'loggedInUser'] under mounted observers, so set it to null instead.
      queryClient.removeQueries({
        predicate: (query) => query.queryHash !== hashKey(LOGGED_IN_USER_QUERY_KEY),
      })
      queryClient.setQueryData(LOGGED_IN_USER_QUERY_KEY, null)
      options?.onSuccess?.(...args)
    },
  })
}

export default useLogout
