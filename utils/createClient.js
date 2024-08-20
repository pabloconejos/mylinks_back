import { createClient } from '@libsql/client'

export const client = createClient({
  url: '', // TURSO URL
  authToken: '' // TURSO AUTH TOKEN
})
