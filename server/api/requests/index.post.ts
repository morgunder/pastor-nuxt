import { useValidatedBody, z } from 'h3-zod'

export default eventHandler(async (event) => {
  const { name, title } = await useValidatedBody(event, {
    name: z.string().min(1).max(100),
    title: z.string().min(1).max(100)
  })
  const session = await requireUserSession(event)

  // List requests for the current user
  const request = await useDB().insert(tables.requests).values({
    userId: session.user.id,
    name,
    title,
    createdAt: new Date()
  }).returning().get()

  return request
})
