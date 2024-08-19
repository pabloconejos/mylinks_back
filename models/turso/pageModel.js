import { client } from '../../utils/index.js'

export class PageModel {
  static async search ({ id }) {
    try {
      const { rows } = await client.execute('SELECT * FROM linkspage WHERE user_id = ?', [id])
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
    try {
      await client.execute('INSERT INTO linkspage (id, user_id, title) VALUES (?, ?, ?)', [idPage, id, 'New Page'])
      return idPage
    } catch (e) {
      throw new Error('An error occurred when the server tried to add a new page')
    }
  }

  static async update ({ input, id }) {
    try {
      const { rowsAffected } = await client.execute(
        'UPDATE linkspage SET title = ?, description = ?, background_emoji = ?, background_color = ?, background_html_id = ? WHERE id = ?',
        [input.pageName, input.pageDescription, input.emojiBg, input.colorBg, input.cssBg, id]
      )

      if (rowsAffected === 0) {
        throw new Error('PageNotFound')
      }

      return id
    } catch (e) {
      if (e.message === 'PageNotFound') {
        throw new Error('The page you are trying to update does not exist.')
      } else {
        throw new Error('An unexpected error occurred while updating the page. Please try again later.')
      }
    }
  }
}
