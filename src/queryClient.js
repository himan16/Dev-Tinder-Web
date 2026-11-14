import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { LOGGED_IN_USER_QUERY_KEY } from './constant.js'
import { ApiError } from './services/request.js'

// One rule for every call: a 401 means the session is gone (e.g. the cookie expired),
// so clear the user and let RequireAuth redirect to /login.
function handleUnauthorized(error) {
  if (error instanceof ApiError && error.status === 401) {
    queryClient.setQueryData(LOGGED_IN_USER_QUERY_KEY, null)
  }
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleUnauthorized }),
  mutationCache: new MutationCache({ onError: handleUnauthorized }),
})

export default queryClient
