import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { enroll } from '../controllers/enrollment.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { requireRole } from '../middleware/role.middleware.js'
import { ROLES } from '../constants/roles.js'
import { enrollmentSchema } from '../validator/enrollment.validator.js'

export const enrollmentRoutes = new Hono()

enrollmentRoutes.post(
  '/',
  authMiddleware,
  requireRole(ROLES.STUDENT),
  zValidator('json', enrollmentSchema),
  enroll
)