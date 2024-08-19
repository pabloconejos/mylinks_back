import { Router } from 'express'
import { BgHtmlController } from '../controllers/index.js'

export const createBgHtmlRouter = ({ bgHtmlModel }) => {
  const authRouter = Router()

  const bgHtmlController = new BgHtmlController({ bgHtmlModel })

  authRouter.get('/bg', bgHtmlController.getBackgrounds)

  return authRouter
}
