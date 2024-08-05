import z from 'zod'

// TODO LO QUE NO SE ESTA VALIDANDO LO IGNORA !!!!!!!!!!!

const userSchema = z.object({
  mail: z.string({
    invalid_type_error: 'Mail must be string',
    required_error: 'Mail is required.'
  }),
  username: z.string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username is required.'
  }),
  password: z.string({
    invalid_type_error: 'Password must be a string',
    required_error: 'Password is required.'
  }).min(5, {
    message: 'Password must be at least 5 characters long'
  })
})

export function validateUser (input) {
  return userSchema.safeParse(input)
}

export function validatePartialUser (input) {
  return userSchema.partial().safeParse(input) // con el partial hace que las propiedades sean opcionales (Si no estan no pasa nada, pero si estan las valida)
}
