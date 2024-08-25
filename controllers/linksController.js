import { validateLink } from '../schemas/index.js'

export class LinksController {
  constructor ({ linksModel }) {
    this.linksModel = linksModel
  }

  setLink = async (req, res) => {
    const { user } = req.session
    if (!user) {
      return res.status(401).json({ authenticated: false, message: 'Unauthorized' })
    }
    const result = validateLink(req.body.link)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    try {
      const link = await this.linksModel.setLink({ input: result.data, userId: user.id })
      res.json({ linkId: link })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }

  getLinks = async (req, res) => {
    const { user } = req.session

    if (!user) {
      return res.status(401).json({ authenticated: false, message: 'Unauthorized' })
    }

    try {
      const links = await this.linksModel.getLinks({ userId: user.id })
      res.json(links)
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }

  deleteLinks = async (req, res) => {
    const { user } = req.session
    const { id } = req.params

    if (!user) {
      return res.status(401).json({ authenticated: false, message: 'Unauthorized' })
    }

    try {
      const link = await this.linksModel.deleteLink({ userId: user.id, linkId: id })
      res.json({ link })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }

  editLinks = async (req, res) => {
    const { user } = req.session
    const { link } = req.body

    if (!user) {
      return res.status(401).json({ authenticated: false, message: 'Unauthorized' })
    }

    try {
      const linkId = await this.linksModel.editLink({ userId: user.id, link })
      res.json({ linkId })
    } catch (e) {
      res.status(400).json({ message: e.message })
    }
  }

  getLinksImages = async (req, res) => {
    try {
      const images = await this.linksModel.getLinksImages()
      res.json(images)
    } catch (e) {
      res.status(404).json({ message: e.message })
    }
  }
}
