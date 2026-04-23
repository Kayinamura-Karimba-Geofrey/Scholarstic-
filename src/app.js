import { Hono } from 'hono'
import { authRoutes } from './routes/auth.routes.js'
import { courseRoutes } from './routes/course.routes.js'
import { enrollmentRoutes } from './routes/enrollment.routes.js'
import { gradeRoutes } from './routes/grade.routes.js'
import { swaggerUI } from '@hono/swagger-ui'
import { openAPISpec } from './docs/openapi.js'

export const app = new Hono()

app.route('/auth', authRoutes)
app.route('/courses', courseRoutes)
app.route('/enrollments', enrollmentRoutes)
app.route('/grades', gradeRoutes)
app.get('/docs', swaggerUI({ spec: openAPISpec }))