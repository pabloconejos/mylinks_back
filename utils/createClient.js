import { createClient } from '@libsql/client'

export const client = createClient({
  url: 'libsql://my-links-db-pabloconejos.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjI3ODk3ODUsImlkIjoiZjI2ZTIwOWUtMmRiMC00NjQwLWEzMGUtZTUzYjE4MTJiMWFmIn0.taEPXBUhy72bgd5lJjy_M4ZjjK1Z0CdUuXASmoPDMl5TTkcR6KIyISgHGrclwuUuevnqhL64-OR1uPdQ_YfpBA'
})
