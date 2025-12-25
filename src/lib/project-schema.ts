import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  type: z.enum(['single', 'process']),
  tags: z.array(z.string()),
  featuredImage: z.string().optional(),
  processStages: z.array(
    z.object({
      id: z.string(),
      image: z.string(),
      name: z.string(),
      caption: z.string().optional(),
    })
  ).optional(),
  video: z.object({
    provider: z.enum(['youtube', 'vimeo', 'url']),
    videoId: z.string(),
    timestamps: z.array(
      z.object({
        label: z.string(),
        timestamp: z.number(),
      })
    ).optional(),
  }).optional(),
  published: z.boolean(),
  order: z.number(),
})

export type ProjectFormData = z.infer<typeof projectSchema>
