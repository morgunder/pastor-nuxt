import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const session = await requireUserSession(event)

  // List requests for the current user
  const requests = await useDB().select().from(tables.requests).where(eq(tables.requests.userId, session.user.id)).all()

  return requests
})
