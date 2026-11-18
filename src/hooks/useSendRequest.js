import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FEED_QUERY_KEY, SEND_REQUEST_MUTATION_KEY } from '../constant.js'
import { sendRequest } from '../services/connectionRequest.js'

function useSendRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: SEND_REQUEST_MUTATION_KEY,
    mutationFn: sendRequest,
    // Optimistic update: the card leaves the deck at once, before the server answers.
    onMutate: async ({ userId }) => {
      // Stop a running refetch so it can't bring the card back.
      await queryClient.cancelQueries({ queryKey: FEED_QUERY_KEY })
      const swipedUser = queryClient
        .getQueryData(FEED_QUERY_KEY)
        ?.users.find((user) => user._id === userId)
      queryClient.setQueryData(FEED_QUERY_KEY, (old) =>
        old && { ...old, users: old.users.filter((user) => user._id !== userId) },
      )
      return { swipedUser }
    },
    // Rollback: put back only this card, so other swipes made meanwhile are kept.
    onError: (error, variables, context) => {
      if (context?.swipedUser) {
        queryClient.setQueryData(FEED_QUERY_KEY, (old) =>
          old && { ...old, users: [context.swipedUser, ...old.users] },
        )
      }
    },
  })
}

export default useSendRequest
