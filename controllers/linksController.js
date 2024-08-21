import { validateLink } from '../schemas/index.js'

export class LinksController {
  constructor ({ linksModel }) {
    this.linksModel = linksModel
  }

  setLink = async (req, res) => {
    const { user } = req.session
    console.log(req.body.data)
    const result = validateLink(req.body.data)

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

  getLinksImages = async (req, res) => {
    try {
      const images = await this.linksModel.getLinksImages()
      res.json(images)
    } catch (e) {
      res.status(404).json({ message: e.message })
    }
  }
}
