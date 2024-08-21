import { client } from '../../utils/index.js'

export class LinksModel {
  static async setLink ({ input, userId }) {
    const idLink = crypto.randomUUID()
    console.log({ input, userId, idLink })
    return true
    /* try {
      await client.execute('INSERT INTO links (id, user_id, page_id, url, title, description, image_id) VALUES (?,?,?,?,?,?,?)', [idLink])
    } catch (e) {
      throw new Error('error')
    } */
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
