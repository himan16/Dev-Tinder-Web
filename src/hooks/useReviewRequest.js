import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CONNECTIONS_QUERY_KEY, RECEIVED_REQUESTS_QUERY_KEY } from '../constant.js'
import { ApiError } from '../services/request.js'
import { reviewRequest } from '../services/requests.js'

function useReviewRequest(options) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: reviewRequest,
    ...options,
    // Optimistic update: the row leaves the list at once, before the server answers.
    onMutate: async ({ requestId }) => {
      await queryClient.cancelQueries({ queryKey: RECEIVED_REQUESTS_QUERY_KEY })
      const removedRequest = queryClient
        .getQueryData(RECEIVED_REQUESTS_QUERY_KEY)
        ?.find((request) => request._id === requestId)
      queryClient.setQueryData(RECEIVED_REQUESTS_QUERY_KEY, (old) =>
        old?.filter((request) => request._id !== requestId),
      )
      return { removedRequest }
    },
    onSuccess: (data, variables, ...rest) => {
      // An accepted request is a new connection, so that list is out of date now.
      if (variables.status === 'accepted') {
        queryClient.invalidateQueries({ queryKey: CONNECTIONS_QUERY_KEY })
      }
      options?.onSuccess?.(data, variables, ...rest)
    },
    onError: (error, variables, context, ...rest) => {
      if (error instanceof ApiError && error.status === 404) {
        // Already reviewed (for example from another tab). Putting the row back would offer an
        // action that can never work, so re-sync with the server instead of rolling back.
        queryClient.invalidateQueries({ queryKey: RECEIVED_REQUESTS_QUERY_KEY })
      } else if (context?.removedRequest) {
        // Roll back only this row, so other reviews made meanwhile are kept.
        queryClient.setQueryData(RECEIVED_REQUESTS_QUERY_KEY, (old) =>
          old && [context.removedRequest, ...old],
        )
      }
      options?.onError?.(error, variables, context, ...rest)
    },
  })
}

export default useReviewRequest
