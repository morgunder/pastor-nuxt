import { eq, and } from 'drizzle-orm'
import { useValidatedParams, useValidatedBody, z, zh } from 'h3-zod'

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString
  })
  const { completed } = await useValidatedBody(event, {
    completed: z.number().int().min(0).max(1)
  })
  const session = await requireUserSession(event)

  // List requests for the current user
  const request = await useDB().update(tables.requests).set({
    completed
  }).where(and(
    eq(tables.requests.id, id),
    eq(tables.requests.userId, session.user.id)
  )).returning().get()

  return request
})
