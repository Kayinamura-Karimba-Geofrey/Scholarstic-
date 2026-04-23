export const requireRole = (...allowedRoles) => {
  return async (c, next) => {
    const user = c.get('user')

    if (!user) {
      return c.text('Unauthorized', 401)
    }

    if (!allowedRoles.includes(user.role)) {
      return c.text('Forbidden: Access denied', 403)
    }

    await next()
  }
}