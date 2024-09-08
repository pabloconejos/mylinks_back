import express, { json } from 'express'
import cors from 'cors'

import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from './config.js'

import { createAuthRouter, createPageRouter, createBgHtmlRouter, createUserRouter } from './routes/index.js'
import { createLinksRouter } from './routes/linksRouter.js'

export const createApp = ({ authModel, pageModel, bgHtmlModel, linksModel, userModel }) => {
  const app = express()
  app.disable('x-powered-by')

  const allowedOrigins = [
    'http://localhost:4200', // Durante desarrollo
    'https://mi-app.vercel.app' // En producción
  ]

  app.use(cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true // Permite el envío de cookies
  }))

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
  app.get('/', (req, res) => res.json({ okey: true }))
  app.use('/auth', createAuthRouter({ authModel }))
  app.use('/page', createPageRouter({ pageModel }))
  app.use('/background-html', createBgHtmlRouter({ bgHtmlModel }))
  app.use('/links', createLinksRouter({ linksModel }))
  app.use('/user', createUserRouter({ userModel }))
  app.use((req, res, next) => { res.status(404).json({ error: 'Route not found' }) })

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}
