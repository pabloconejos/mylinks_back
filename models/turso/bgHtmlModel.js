import { client } from '../../utils/index.js'

export class BgHtmlModel {
  static async getBackgrounds () {
    try {
      const { rows } = await client.execute('SELECT * FROM html_bg')
      if (rows.length > 0) {
        return rows
      } else {
        throw new Error('backgrounds not found')
      }
    } catch (e) {
      throw new Error('backgrounds not found')
    }
  }
}
