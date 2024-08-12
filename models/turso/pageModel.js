import { client } from '../../utils/createClient.js'

export class PageModel {
  static async search ({ id }) {
    try {
      const { rows } = await client.execute('SELECT * FROM linkspage WHERE user_id = ?', [id])
      console.log(rows)
      if (rows.length > 0) {
        return rows
      } else {
        throw new Error('page not found')
      }
    } catch (e) {
      throw new Error('page not found')
    }
  }

  static async create ({ id }) {
    const idPage = crypto.randomUUID()
    console.log({ id, idPage })
    try {
      await client.execute('INSERT INTO linkspage (id, user_id, title) VALUES (?, ?, ?)', [idPage, id, 'New Page'])
      return idPage
    } catch (e) {
      throw new Error('An error occurred when the server tried to add a new page')
    }
  }
}
