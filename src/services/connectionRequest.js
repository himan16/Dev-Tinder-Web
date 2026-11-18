import { request } from './request.js'

// `status` is 'interested' (like) or 'ignored' (pass).
export function sendRequest({ status, userId }) {
  return request(`/request/send/${status}/${userId}`, { method: 'POST' })
}
