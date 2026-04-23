import { z } from 'zod'

export const enrollmentSchema = z.object({
  courseId: z.number().int().positive('Valid courseId is required')
})
