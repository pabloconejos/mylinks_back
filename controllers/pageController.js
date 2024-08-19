import { validateUpdate } from '../schemas/index.js'

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

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    try {
      const updatePage = await this.pageModel.update({ input: result.data, id: user.id })
      res.json({ pageId: updatePage })
    } catch (e) {
      if (e.message === 'The page you are trying to update does not exist.') {
        res.status(404).json({ message: e.message })
      } else {
        res.status(409).json({ message: e.message })
      }
    }
  }
}
