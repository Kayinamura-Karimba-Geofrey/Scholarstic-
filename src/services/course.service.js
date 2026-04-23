import { prisma } from '../prisma/client.js'

export const createCourse = async (title, teacherId) => {
  return prisma.course.create({
    data: {
      title,
      teacherId
    }
  })
}

export const getAllCourses = async () => {
  return prisma.course.findMany()
}