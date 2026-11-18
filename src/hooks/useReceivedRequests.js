import { useQuery } from '@tanstack/react-query'
import { RECEIVED_REQUESTS_QUERY_KEY } from '../constant.js'
import { getReceivedRequests } from '../services/requests.js'

function useReceivedRequests() {
  return useQuery({
    queryKey: RECEIVED_REQUESTS_QUERY_KEY,
    queryFn: getReceivedRequests,
    retry: false,
  })
}

export default useReceivedRequests
