import { SALT_ROUNDS } from '../../config.js'
import { client } from '../../utils/index.js'

import crypto from 'node:crypto'
import bcrypt from 'bcrypt'

export class AuthModel {
  static async hola () {
    return 'hola'
  }

  static async register ({ input }) {
    // 3.crear id
    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS)
    try {
      await client.execute('INSERT INTO users (id, username, mail, password) VALUES (?, ?, ?, ?)', [id, input.username, input.mail, hashedPassword])
      return id
    } catch (e) {
      throw new Error('user already exists')
    }
  }

  static async login ({ input }) {
    const { mail, password } = input
    // asegurarnos de que el usuario exisye

    const { rows } = await client.execute('SELECT * FROM users WHERE mail = ?', [mail])
    const user = rows[0]
    if (!user) { throw new Error('mail does not exist') }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) { throw new Error('password is invalid') }

    return {
      id: user.id,
      username: user.username,
      mail: user.mail
    }
  }

  static async getUser ({ userid }) {
    try {
      const { rows } = await client.execute(`
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
            LEFT JOIN html_bg html ON html.id = lsp.background_html_id
        WHERE
            u.id = ?;
        `, [userid])

      const user = rows[0]

      if (!user) { throw new Error('user does not exist') }

      return user
    } catch (e) {
      throw new Error(e)
    }
  }
}
