import { createApp } from './app.js'
import { AuthModel } from './models/turso/authModel.js'
import { BgHtmlModel } from './models/turso/bgHtmlModel.js'
import { PageModel } from './models/turso/pageModel.js'

createApp({ authModel: AuthModel, pageModel: PageModel, bgHtmlModel: BgHtmlModel })
