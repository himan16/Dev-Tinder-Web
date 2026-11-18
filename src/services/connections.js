import { request } from './request.js'

export async function getConnections() {
  const data = await request('/connections')
  return data.connections
}
