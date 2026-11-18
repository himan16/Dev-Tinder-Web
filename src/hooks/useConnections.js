import { useQuery } from '@tanstack/react-query'
import { CONNECTIONS_QUERY_KEY } from '../constant.js'
import { getConnections } from '../services/connections.js'

function useConnections() {
  return useQuery({
    queryKey: CONNECTIONS_QUERY_KEY,
    queryFn: getConnections,
    retry: false,
  })
}

export default useConnections
