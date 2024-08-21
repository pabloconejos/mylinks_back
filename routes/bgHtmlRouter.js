import { Router } from 'express'
import { BgHtmlController } from '../controllers/index.js'

export const createBgHtmlRouter = ({ bgHtmlModel }) => {
  const bgHtmlRouter = Router()

  const bgHtmlController = new BgHtmlController({ bgHtmlModel })

  bgHtmlRouter.get('/bg', bgHtmlController.getBackgrounds)

  return bgHtmlRouter
}
