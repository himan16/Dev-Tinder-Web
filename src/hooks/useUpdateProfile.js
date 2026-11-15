import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LOGGED_IN_USER_QUERY_KEY } from '../constant.js'
import { updateProfile } from '../services/profile.js'

function useUpdateProfile(options) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfile,
    ...options,
    onSuccess: (data, ...rest) => {
      // The response has the saved user, so the page and the NavBar update with no refetch.
      queryClient.setQueryData(LOGGED_IN_USER_QUERY_KEY, data.updatedUser)
      options?.onSuccess?.(data, ...rest)
    },
  })
}

export default useUpdateProfile
