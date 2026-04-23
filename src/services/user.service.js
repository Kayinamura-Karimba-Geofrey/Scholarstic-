import { prisma } from '../prisma/client.js'

export const getMyGrades = async (userId) => {
  return prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: true,
      grade: true
    }
  })
}

export const getMyCourses = async (userId, role) => {
  if (role === 'TEACHER') {
    return prisma.course.findMany({
      where: { teacherId: userId },
      include: {
        enrollments: {
          include: {
            user: {
              select: { name: true }
            },
            grade: true
          }
        }
      }
    })
  }

  // For Students: return enrolled courses
  return prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: true
    }
  })
}
