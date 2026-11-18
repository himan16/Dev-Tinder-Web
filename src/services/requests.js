import { request } from './request.js'

// Resolves to the requests other users sent you that are still waiting for an answer.
export async function getReceivedRequests() {
  const data = await request('/requests/received')
  return data.requests
}

// `status` is 'accepted' or 'rejected'. `requestId` is the request's own id, not the sender's.
export function reviewRequest({ status, requestId }) {
  return request(`/request/review/${status}/${requestId}`, { method: 'POST' })
}
