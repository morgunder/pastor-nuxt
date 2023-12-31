import { eq, and } from 'drizzle-orm'
import { useValidatedParams, zh } from 'h3-zod'

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString
  })
  const session = await requireUserSession(event)

  // List requests for the current user
  const deletedRequest = await useDB().delete(tables.requests).where(and(
    eq(tables.requests.id, id),
    eq(tables.requests.userId, session.user.id)
  )).returning().get()

  if (!deletedRequest) {
    throw createError({
      statusCode: 404,
      message: 'Request not found'
    })
  }
  return deletedRequest
})
