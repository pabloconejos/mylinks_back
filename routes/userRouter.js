import { Router } from 'express'
import { UserController } from '../controllers/index.js'

export const createUserRouter = ({ userModel }) => {
  const pageRouter = Router()

  const userController = new UserController({ userModel })

  // pageRouter.post('/delete', userController.create)
  pageRouter.patch('/update', userController.update)
  pageRouter.patch('/changePassword', userController.resetPassword)
  return pageRouter
}
