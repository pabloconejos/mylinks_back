export const {
  PORT = 3000,
  SALT_ROUNDS = 10,
  SECRET_JWT_KEY = 'this-is-a-secret-key-,/L6p?F{icu35s8<j7e4,',
  AUTHTOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjI3ODk3ODUsImlkIjoiZjI2ZTIwOWUtMmRiMC00NjQwLWEzMGUtZTUzYjE4MTJiMWFmIn0.taEPXBUhy72bgd5lJjy_M4ZjjK1Z0CdUuXASmoPDMl5TTkcR6KIyISgHGrclwuUuevnqhL64-OR1uPdQ_YfpBA',
  URI = 'libsql://my-links-db-pabloconejos.turso.io'
} = process.env
