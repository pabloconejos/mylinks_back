import { Router } from 'express'
import { AuthController } from '../controllers/index.js'

export const createAuthRouter = ({ authModel }) => {
  const authRouter = Router()

  const authController = new AuthController({ authModel })

  authRouter.post('/login', authController.login)
  authRouter.post('/register', authController.register)
  authRouter.post('/logout', authController.logout)
  authRouter.get('/check-auth', authController.checkAuth)
  authRouter.get('/user', authController.getUser)

  return authRouter
}
