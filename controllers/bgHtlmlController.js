export class BgHtmlController {
  constructor ({ bgHtmlModel }) {
    this.bgHtmlModel = bgHtmlModel
  }

  getBackgrounds = async (req, res) => {
    try {
      const bg = await this.bgHtmlModel.getBackgrounds()
      res.json({ data: bg })
    } catch (e) {
      res.status(404).json({ message: e.message })
    }
  }
}
