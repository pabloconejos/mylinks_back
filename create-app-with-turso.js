import { createApp } from './app.js'
import { AuthModel, PageModel, BgHtmlModel, LinksModel, UserModel } from './models/turso/index.js'

createApp({ authModel: AuthModel, pageModel: PageModel, bgHtmlModel: BgHtmlModel, linksModel: LinksModel, userModel: UserModel })
