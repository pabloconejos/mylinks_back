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
    const { id } = req.body
    const createPage = await this.pageModel.create({ id })
    res.json({ message: createPage })
  }
}
