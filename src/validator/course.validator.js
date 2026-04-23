import { z } from 'zod'

export const courseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  teacherId: z.number().int().positive('Valid teacherId is required')
})
