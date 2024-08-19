import { createApp } from './app.js'
import { AuthModel, PageModel, BgHtmlModel } from './models/turso/index.js'

createApp({ authModel: AuthModel, pageModel: PageModel, bgHtmlModel: BgHtmlModel })
