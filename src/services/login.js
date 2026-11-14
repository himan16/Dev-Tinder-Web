import { request } from './request.js'

export function login({ email, password }) {
  return request('/login', { method: 'POST', body: { email, password } })
}
