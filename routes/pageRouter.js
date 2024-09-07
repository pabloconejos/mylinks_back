import { Router } from 'express'
import { PageController } from '../controllers/index.js'
import { rateLimit } from 'express-rate-limit'

export const createPageRouter = ({ pageModel }) => {
  const pageRouter = Router()

  const pageController = new PageController({ pageModel })

  const likeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: 'Demasiadas solicitudes de likes desde esta IP, por favor intente de nuevo más tarde.'
  })

  pageRouter.get('/search', pageController.search)
  pageRouter.post('/create', pageController.create)
  pageRouter.patch('/update', pageController.update)
  pageRouter.patch('/like', likeLimiter, pageController.like)
  return pageRouter
}
