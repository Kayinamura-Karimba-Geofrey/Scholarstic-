import { getMyGrades, getMyCourses } from '../services/user.service.js'

export const getGrades = async (c) => {
  const user = c.get('user')
  const results = await getMyGrades(user.id)
  return c.json(results)
}

export const getCourses = async (c) => {
  const user = c.get('user')
  const results = await getMyCourses(user.id, user.role)
  return c.json(results)
}
