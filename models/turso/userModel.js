import { client } from '../../utils/index.js'
import { SALT_ROUNDS } from '../../config.js'

import bcrypt from 'bcrypt'

export class UserModel {
  static async update ({ userData, id }) {
    try {
      const query = await client.execute(
        'UPDATE users SET username = ?, mail = ? WHERE id = ?',
        [userData.username, userData.mail, id]
      )

      console.log(query)
      const { rowsAffected } = query
      if (rowsAffected === 0) {
        throw new Error('PageNotFound')
      }
      return true
    } catch (e) {
      console.log(e.message)
      throw new Error(e.message)
    }
  }

  static async ckechPassword ({ oldPassword, id }) {
    const { rows } = await client.execute('SELECT password FROM users WHERE id = ?', [id])
    const passwordBd = rows[0].password
    if (!passwordBd) { throw new Error('user does not exist') }

    const isValid = await bcrypt.compare(oldPassword, passwordBd)
    if (!isValid) {
      throw new Error('Passwords doesn´t match')
    }

    return true
  }

  static async changePassword ({ newPassword, id }) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS)

      const { rowsAffected } = await client.execute(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashedPassword, id]
      )

      if (rowsAffected === 0) {
        throw new Error('PageNotFound')
      }
      return true
    } catch (e) {
      throw new Error('page not found')
    }
  }

  static async getUser ({ user, exact = false }) {
    try {
      let params
      let query = `
      SELECT
        u.id AS user_id,
        u.username,
        u.mail,
        lsp.id AS page_id,
        lsp.title,
        lsp.description,
        lsp.likes,
        lsp.background_emoji,
        lsp.background_color,
        lsp.background_html_id,
        lsp.bg_mode,
        lsp.mainColor,
        lsp.secondaryColor,
        html.css_real_bg
      FROM
        users u
        LEFT JOIN linkspage lsp ON u.id = lsp.user_id
        LEFT JOIN html_bg html ON html.id = lsp.background_html_id`

      if (exact && user) {
        query = `${query} WHERE username = ?`
        params = [user]
      } else if (!exact && user) {
        query = `${query} WHERE username LIKE ?`
        params = [`${user}%`]
      }

      const { rows } = await client.execute(query, params)

      if (rows.length <= 0) {
        return []
      }

      return rows
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
