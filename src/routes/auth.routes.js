import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { register, login } from '../controllers/auth.controller.js'
import { registerSchema, loginSchema } from '../validator/auth.validator.js'
export const authRoutes = new Hono()

authRoutes.post('/register', zValidator('json', registerSchema), register)
authRoutes.post('/login', zValidator('json', loginSchema), login)
