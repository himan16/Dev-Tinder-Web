export const BASE_URL = 'http://localhost:7777'

// TanStack Query cache key for the logged-in user. `null` means logged out.
export const LOGGED_IN_USER_QUERY_KEY = ['devTinder', 'loggedInUser']

// TanStack Query cache key for the swipe deck. Data shape: { users, isLastBatch }.
export const FEED_QUERY_KEY = ['devTinder', 'feed']
export const SEND_REQUEST_MUTATION_KEY = ['devTinder', 'sendRequest']

// The backend caps /feed at 12 per request.
export const FEED_PAGE_SIZE = 5
// Refetch the next batch in the background once this many cards (or fewer) are left.
export const FEED_PREFETCH_THRESHOLD = 3

export const RECEIVED_REQUESTS_QUERY_KEY = ['devTinder', 'receivedRequests']
export const CONNECTIONS_QUERY_KEY = ['devTinder', 'connections']
