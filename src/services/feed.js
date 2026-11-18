import { FEED_PAGE_SIZE } from '../constant.js'
import { request } from './request.js'

// Always asks for page 1: users you already swiped on are excluded by the backend,
// so page 1 is always the next unseen batch. A batch smaller than the page size is the last one.
export async function getFeed() {
  const data = await request(`/feed?limit=${FEED_PAGE_SIZE}`)
  return { users: data.feed, isLastBatch: data.feed.length < FEED_PAGE_SIZE }
}
