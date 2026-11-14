import { useQuery } from '@tanstack/react-query'
import { LOGGED_IN_USER_QUERY_KEY } from '../constant.js'
import { getProfile } from '../services/profile.js'

const FIVE_MINUTES = 5 * 60 * 1000

function useCurrentUser() {
  return useQuery({
    queryKey: LOGGED_IN_USER_QUERY_KEY,
    queryFn: getProfile,
    staleTime: FIVE_MINUTES,
    // Don't retry: a down backend should show an error quickly, not after ~7s of backoff.
    retry: false,
  })
}

export default useCurrentUser
