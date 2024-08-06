import { SALT_ROUNDS } from '../../config.js'
import { client } from '../../utils/createClient.js'

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
}
