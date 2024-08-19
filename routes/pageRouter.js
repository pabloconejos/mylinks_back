import { Router } from 'express'
import { PageController } from '../controllers/index.js'

export const createPageRouter = ({ pageModel }) => {
  const pageRouter = Router()

  const pageController = new PageController({ pageModel })

  pageRouter.get('/search', pageController.search)
  pageRouter.post('/create', pageController.create)
  pageRouter.patch('/update', pageController.update)

  return pageRouter
}
