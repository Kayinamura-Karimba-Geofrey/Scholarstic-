import { prisma } from '../prisma/client.js'

export const assignGrade = async (enrollmentId, score) => {
  return prisma.grade.create({
    data: {
      enrollmentId,
      score
    }
  })
}