import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { authRoutes } from './routes/auth.routes.js'
import { courseRoutes } from './routes/course.routes.js'
import { enrollmentRoutes } from './routes/enrollment.routes.js'
import { gradeRoutes } from './routes/grade.routes.js'
import { userRoutes } from './routes/user.routes.js'
import { swaggerUI } from '@hono/swagger-ui'
import { openAPISpec } from './docs/openapi.js'

export const app = new Hono()

app.use('*', logger())

app.route('/auth', authRoutes)
app.route('/courses', courseRoutes)
app.route('/enrollments', enrollmentRoutes)
app.route('/grades', gradeRoutes)
app.route('/users', userRoutes)

app.get('/docs', swaggerUI({ spec: openAPISpec }))

// Global Error Handler
app.onError((err, c) => {
  console.error(`${err.message}`)
  const status = err.status || 500
  return c.json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  }, status)
})