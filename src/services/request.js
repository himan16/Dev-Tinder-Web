import { BASE_URL } from '../constant.js'

export class ApiError extends Error {
  constructor(status, message, errors = {}) {
    super(message)
    this.status = status
    // Per-field messages from the backend, e.g. { email: 'An account with this email already exists.' }
    this.errors = errors
  }
}

export async function request(path, { method = 'GET', body } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    // Lets the browser accept and send the backend's `token` cookie.
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new ApiError(response.status, data?.message ?? 'Request failed', data?.errors)
  }
  return data
}
