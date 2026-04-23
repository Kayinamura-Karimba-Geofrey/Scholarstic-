import { createCourse, getAllCourses } from '../services/course.service.js'

export const create = async (c) => {
  const body = c.req.valid('json')

  const course = await createCourse(body.title, body.teacherId)

  return c.json(course, 201)
}

export const getAll = async (c) => {
  const page = parseInt(c.req.query('page')) || 1
  const limit = parseInt(c.req.query('limit')) || 10
  
  const result = await getAllCourses(page, limit)
  return c.json(result)
}
