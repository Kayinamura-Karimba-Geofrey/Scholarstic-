import { createCourse, getAllCourses } from '../services/course.service.js'

export const create = async (c) => {
  const body = await c.req.json()
  const { title, teacherId } = body

  const course = await createCourse(title, teacherId)

  return c.json(course, 201)
}

export const getAll = async (c) => {
  const courses = await getAllCourses()
  return c.json(courses)
}