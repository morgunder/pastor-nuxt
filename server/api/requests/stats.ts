import { sql } from 'drizzle-orm'

export default eventHandler(async () => {
  // Count the total number of requests
  return await useDB().select({
    requests: sql<number>`count(*)`,
    users: sql<number>`count(distinct(${tables.requests.userId}))`
  }).from(tables.requests).get()
})
