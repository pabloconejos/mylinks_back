import { Router } from 'express'
import { LinksController } from '../controllers/index.js'

export const createLinksRouter = ({ linksModel }) => {
  const linksRouter = Router()

  const linksController = new LinksController({ linksModel })

  linksRouter.post('/link', linksController.setLink)
  linksRouter.get('/links', linksController.getLinks)
  linksRouter.delete('/link', linksController.deleteLinks)
  linksRouter.get('/linksImages', linksController.getLinksImages)

  return linksRouter
}
