import { enrollStudent } from '../services/enrollment.service.js'

export const enroll = async (c) => {
  const user = c.get('user')
  const body = await c.req.json()

  const enrollment = await enrollStudent(
    user.id,
    body.courseId
  )

  return c.json(enrollment, 201)
}