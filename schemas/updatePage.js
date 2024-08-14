import { z } from 'zod'

const updateSchema = z.object({
  pageName: z.string({
    invalid_type_error: 'pageName must be a string'
  }),
  pageDescription: z.string({
    invalid_type_error: 'pageDescription must be a string'
  }),
  emojiBg: z.string({
    invalid_type_error: 'emojiBg must be a string'
  }),
  colorBg: z.string({
    invalid_type_error: 'colorBg must be a string'
  }),
  cssBg: z.number({
    invalid_type_error: 'cssBg must be a number'
  })
})

export function validateUpdate (input) {
  return updateSchema.safeParse(input)
}

export function validatePartialUpdate (input) {
  return updateSchema.partial().safeParse(input)
}