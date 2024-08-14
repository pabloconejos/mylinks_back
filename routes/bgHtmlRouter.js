import { Router } from 'express'
import { BgHtmlController } from '../controllers/bgHtlmlController.js'

export const createBgHtmlRouter = ({ bgHtmlModel }) => {
  const authRouter = Router()

  const bgHtmlController = new BgHtmlController({ bgHtmlModel })

  authRouter.get('/bg', bgHtmlController.getBackgrounds)

  return authRouter
}
