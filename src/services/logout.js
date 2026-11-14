import { request } from './request.js'

export function logout() {
  return request('/logout', { method: 'POST' })
}
