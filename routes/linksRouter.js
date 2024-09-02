import { Router } from 'express'
import { LinksController } from '../controllers/index.js'

export const createLinksRouter = ({ linksModel }) => {
  const linksRouter = Router()

  const linksController = new LinksController({ linksModel })

  linksRouter.post('/link', linksController.setLink)
  linksRouter.delete('/link/:id', linksController.deleteLinks)
  linksRouter.patch('/link', linksController.editLinks)
  linksRouter.get('/linksImages', linksController.getLinksImages)
  linksRouter.get('/:user', linksController.getLinks)

  return linksRouter
}
