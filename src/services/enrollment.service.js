import { prisma } from '../prisma/client.js'

export const enrollStudent = async (userId, courseId) => {
  const existing = await prisma.enrollment.findFirst({
    where: {
      userId,
      courseId
    }
  })

  if (existing) {
    throw new Error('Already enrolled in this course')
  }

  return prisma.enrollment.create({
    data: {
      userId,
      courseId
    }
  })
}