import express, { json } from 'express'
import cors from 'cors'
import { createAuthRouter } from './routes/authRouter.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from './config.js'
import { createPageRouter } from './routes/pageRouter.js'

export const createApp = ({ authModel, pageModel }) => {
  const app = express()
  app.disable('x-powered-by')

  app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }))
  app.use(json())
  app.use(cookieParser()) // lee las cookies entrantes y lkas pone a disposicion el en req.cookies

  // checkeo de si tiene token
  app.use((req, res, next) => {
    const token = req.cookies.acces_token
    req.session = { user: null }

    try {
      const payload = jwt.verify(token, SECRET_JWT_KEY)
      req.session.user = payload
    } catch (e) { }

    next() // seguir a la siguiente ruta o middleware
  })

  // RUTAS
  app.use('/auth', createAuthRouter({ authModel }))
  app.use('/page', createPageRouter({ pageModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}
