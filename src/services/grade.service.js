import { prisma } from '../prisma/client.js'

export const assignGrade = async (enrollmentId, score, teacherId) => {
  // Check if enrollment exists AND get the teacherId of the course
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      course: true
    }
  })

  if (!enrollment) {
    throw new Error('Enrollment not found')
  }

  // Security check: Is this teacher assigned to this course?
  if (enrollment.course.teacherId !== teacherId) {
    throw new Error('Not authorized: You are not the teacher of this course')
  }

  // Update if exists, or create
  return prisma.grade.upsert({
    where: { enrollmentId },
    update: { score },
    create: {
      enrollmentId,
      score
    }
  })
}