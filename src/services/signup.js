import { request } from './request.js'

export function signup(details) {
  return request('/signup', { method: 'POST', body: details })
}
