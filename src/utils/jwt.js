import { sign, verify } from '@hono/jwt'
import { env } from '../config/env.js'

export const generateToken = (payload) => {
  return sign(payload, env.JWT_SECRET)
}

export const verifyToken = (token) => {
  return verify(token, env.JWT_SECRET)
}