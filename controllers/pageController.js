import { validateUpdate } from '../schemas/updatePage.js'

export class PageController {
  constructor ({ pageModel }) {
    this.pageModel = pageModel
  }

  search = async (req, res) => {
    const { user } = req.session
    if (!user) return res.status(401).json({ authenticated: false, message: 'Unauthorized' })
    try {
      const searchPage = await this.pageModel.search({ id: user.id })
      res.json({ page: true, data: searchPage })
    } catch (error) {
      res.json({ page: false, message: 'User the user does not have a page yet doesn´t have page' })
    }
  }

  create = async (req, res) => {
    const { user } = req.session
    try {
      const createPage = await this.pageModel.create({ id: user.id })
      res.json({ pageId: createPage })
    } catch (e) {
      res.status(409).json({ message: e.message })
    }
  }

  update = async (req, res) => {
    const { user } = req.session
    const result = validateUpdate(req.body.data)

    console.log(result)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    res.status(200).json({ message: 'hola' })
    /* try {
      const updatePage = await this.pageModel.update({ id: user.id })
      res.json({ pageId: updatePage })
    } catch (e) {
      res.status(409).json({ message: e.message })
    } */
  }
}
