/* eslint-disable camelcase */
import { client } from '../../utils/index.js'

export class LinksModel {
  static async setLink ({ input, userId }) {
    const idLink = crypto.randomUUID()
    const { description, title, image_id, url } = input
    try {
      const { rows } = await client.execute('SELECT id FROM linkspage WHERE user_id = ?', [userId])
      const pageId = rows[0].id
      const { rowsAffected } = await client.execute('INSERT INTO links (id, user_id, page_id, url, title, description, image_id) VALUES (?,?,?,?,?,?,?)', [idLink, userId, pageId, url, title, description, image_id])
      if (rowsAffected >= 1) {
        return idLink
      } else {
        throw new Error('Insertion Error')
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  static async getLinksImages () {
    try {
      const { rows } = await client.execute('SELECT * FROM links_images')
      if (rows.length > 0) {
        return rows
      } else {
        throw new Error('images not found')
      }
    } catch (e) {
      throw new Error('images not found')
    }
  }
}
