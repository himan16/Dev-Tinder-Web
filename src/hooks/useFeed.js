import { useEffect } from 'react'
import { useIsMutating, useQuery } from '@tanstack/react-query'
import {
  FEED_PREFETCH_THRESHOLD,
  FEED_QUERY_KEY,
  SEND_REQUEST_MUTATION_KEY,
} from '../constant.js'
import { getFeed } from '../services/feed.js'

function useFeed() {
  const query = useQuery({
    queryKey: FEED_QUERY_KEY,
    queryFn: getFeed,
    // The deck refetches by its own rule below, not on focus or on a timer.
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
  })
  // A card that was just swiped can still be in the next response if its request hasn't finished,
  // so the background refetch waits until no swipe request is in flight.
  const isSwiping = useIsMutating({ mutationKey: SEND_REQUEST_MUTATION_KEY }) > 0
  const { data, isFetching, isError, refetch } = query

  useEffect(() => {
    const isRunningLow = data && data.users.length <= FEED_PREFETCH_THRESHOLD
    if (isRunningLow && !data.isLastBatch && !isSwiping && !isFetching && !isError) {
      // `cancelRefetch: false` joins a request that is already running instead of restarting it.
      refetch({ cancelRefetch: false })
    }
  }, [data, isSwiping, isFetching, isError, refetch])

  return query
}

export default useFeed
