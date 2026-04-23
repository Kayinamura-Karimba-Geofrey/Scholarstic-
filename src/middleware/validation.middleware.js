export const validate = (schema) => {
  return async (c, next) => {
const body = await c.req.json()

const result = schema.safeParse(body)

if (!result.success) {
    return c.json({ 
        error:result.error.flatten()}, 400)
}
c.set('validatedBody', result.data )
await next()
  }
}