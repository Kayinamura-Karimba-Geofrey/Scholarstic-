import { assignGrade } from '../services/grade.service.js'

export const createGrade = async (c) => {
  const body = await c.req.json()

  const grade = await assignGrade(
    body.enrollmentId,
    body.score
  )

  return c.json(grade, 201)
}