import { Hono } from 'hono'
import { enroll } from '../controllers/enrollment.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { requireRole } from '../middleware/role.middleware.js'
import { ROLES } from '../constants/roles.js'

export const enrollmentRoutes = new Hono()

enrollmentRoutes.post(
  '/',
  authMiddleware,
  requireRole(ROLES.STUDENT),
  enroll
)