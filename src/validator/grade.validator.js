import { z } from 'zod'

export const gradeSchema = z.object({
  enrollmentId: z.number().int().positive('Valid enrollmentId is required'),
  score: z.number().min(0).max(100, 'Score must be between 0 and 100')
})
