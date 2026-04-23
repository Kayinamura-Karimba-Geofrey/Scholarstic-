import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { createGrade } from '../controllers/grade.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { requireRole } from '../middleware/role.middleware.js'
import { ROLES } from '../constants/roles.js'
import { gradeSchema } from '../validator/grade.validator.js'

export const gradeRoutes = new Hono()

gradeRoutes.post(
  '/',
  authMiddleware,
  requireRole(ROLES.TEACHER),
  zValidator('json', gradeSchema),
  createGrade
)