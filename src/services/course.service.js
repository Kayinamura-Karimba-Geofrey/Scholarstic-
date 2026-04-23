import { prisma } from '../prisma/client.js'

export const createCourse = async (title, teacherId) => {
  return prisma.course.create({
    data: {
      title,
      teacherId
    }
  })
}

export const getAllCourses = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit
  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      skip,
      take: limit,
      include: {
        enrollments: {
          select: { id: true }
        }
      }
    }),
    prisma.course.count()
  ])

  return {
    data: courses,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }
}