import { sign, verify } from 'hono/jwt'
import { env } from '../config/env.js'

export const generateToken = (payload) => {
  return sign(
    {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
    },
    env.JWT_SECRET
  )
}

export const verifyToken = (token) => {
  try {
    return verify(token, env.JWT_SECRET)
  } catch (error) {
    return null
  }
}