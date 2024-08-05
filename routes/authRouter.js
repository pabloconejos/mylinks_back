import { Router } from 'express'
import { AuthController } from '../controllers/authController.js'

export const createAuthRouter = ({ authModel }) => {
  const authRouter = Router()

  const authController = new AuthController({ authModel })

  authRouter.get('/hola', authController.hola)

  authRouter.post('/login', authController.login)
  authRouter.post('/register', authController.register)
  authRouter.post('/logout', authController.logout)
  authRouter.get('/check-auth', authController.checkAuth)

  return authRouter
}
