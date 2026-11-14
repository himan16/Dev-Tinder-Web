import { BASE_URL } from '../constant.js'

export async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Lets the browser accept and send the backend's `token` cookie.
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message ?? 'Login failed')
  }
  return data
}
