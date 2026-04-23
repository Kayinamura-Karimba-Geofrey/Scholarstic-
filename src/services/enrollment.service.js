import { prisma } from '../prisma/client.js'

export const enrollStudent = async (userId, courseId) => {
  return prisma.enrollment.create({
    data: {
      userId,
      courseId
    }
  })
}