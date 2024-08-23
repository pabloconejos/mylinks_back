import { z } from 'zod'

const linkSchema = z.object({
  description: z.string({
    invalid_type_error: 'description must be a string'
  }),
  title: z.string({
    invalid_type_error: 'title must be a string'
  }),
  image_id: z.number({
    invalid_type_error: 'image_id must be a number'
  }).nonnegative(),
  linkUrl: z.string({
    invalid_type_error: 'url must be a string'
  }).url()
})

export function validateLink (input) {
  return linkSchema.safeParse(input)
}

export function validatePartialLink (input) {
  return linkSchema.partial().safeParse(input)
}
