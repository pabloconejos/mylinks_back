import { client } from '../../utils/createClient.js'

export class PageModel {
  static async search ({ id }) {
    try {
      const page = await client.execute('SELECT * FROM linkspage WHERE user_id = ?', [id])
      return page
    } catch (e) {
      throw new Error('page not found')
    }
  }

  static async create ({ id }) {
    const idPage = crypto.randomUUID()
    try {
      await client.execute('INSERT INTO linkspage (id, user_id, title) VALUES (?, ?, ?)', [idPage, id, 'New Page'])
      return id
    } catch (e) {
      throw new Error('error')
    }
  }
}
