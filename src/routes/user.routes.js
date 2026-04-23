import { Hono } from 'hono'
import { getGrades, getCourses } from '../controllers/user.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

export const userRoutes = new Hono()

userRoutes.use('*', authMiddleware)

userRoutes.get('/me/grades', getGrades)
userRoutes.get('/me/courses', getCourses)
