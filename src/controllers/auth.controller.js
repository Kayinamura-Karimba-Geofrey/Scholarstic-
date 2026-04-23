import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (c) => {
  const body = c.req.valid('json')
  const user = await registerUser(body.name, body.password, body.role)
  return c.json(user, 201)
}

export const login = async (c) => {
  const body = c.req.valid('json')
  const result = await loginUser(body.name, body.password)
  return c.json(result, 200)
}