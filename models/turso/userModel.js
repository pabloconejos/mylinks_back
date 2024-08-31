import { client } from '../../utils/index.js'
import { SALT_ROUNDS } from '../../config.js'

import bcrypt from 'bcrypt'

export class UserModel {
  static async update ({ userData, id }) {
    try {
      const { rowsAffected } = await client.execute(
        'UPDATE users SET username = ?, mail = ? WHERE id = ?',
        [userData.username, userData.mail, id]
      )

      if (rowsAffected === 0) {
        throw new Error('PageNotFound')
      }
      return true
    } catch (e) {
      throw new Error('page not found')
    }
  }

  static async ckechPassword ({ oldPassword, id }) {
    const { rows } = await client.execute('SELECT password FROM users WHERE id = ?', [id])
    const passwordBd = rows[0].password
    if (!passwordBd) { throw new Error('user does not exist') }

    const isValid = await bcrypt.compare(oldPassword, passwordBd)
    console.log(isValid)
    if (!isValid) {
      throw new Error('Passwords doesn´t match')
    }

    return true
  }

  static async changePassword ({ newPassword, id }) {
    console.log('changePassword')
    try {
      const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS)

      const { rowsAffected } = await client.execute(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashedPassword, id]
      )

      console.log(rowsAffected)
      if (rowsAffected === 0) {
        throw new Error('PageNotFound')
      }
      return true
    } catch (e) {
      throw new Error('page not found')
    }
  }
}
