import { assignGrade } from '../services/grade.service.js'

export const createGrade = async (c) => {
  const user = c.get('user')
  const body = c.req.valid('json')

  const grade = await assignGrade(
    body.enrollmentId,
    body.score,
    user.id
  )

  return c.json(grade, 201)
}
