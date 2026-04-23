import { Hono } from 'hono'
import { create, getAll } from '../controllers/course.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { requireRole } from '../middleware/role.middleware.js'
import { ROLES } from '../constants/roles.js'

export const courseRoutes = new Hono()

// ADMIN only
courseRoutes.post(
  '/',
  authMiddleware,
  requireRole(ROLES.ADMIN),
  create
)

// ALL authenticated users
courseRoutes.get(
  '/',
  authMiddleware,
  requireRole(ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT),
  getAll
)