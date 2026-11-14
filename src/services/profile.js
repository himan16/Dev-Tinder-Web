import { ApiError, request } from './request.js'

// Resolves to the logged-in user, or `null` when there is no valid session.
// A 401 is an expected answer here, so only real failures (server down, 500) throw.
export async function getProfile() {
  try {
    return await request('/profile/view')
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null
    }
    throw error
  }
}
