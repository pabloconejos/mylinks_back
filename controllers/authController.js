import { SECRET_JWT_KEY } from '../config.js'
import { validatePartialUser, validateUser } from '../schemas/index.js'
import jwt from 'jsonwebtoken'

export class AuthController {
  constructor ({ authModel }) {
    this.authModel = authModel
  }

  getUser = async (req, res) => {
    const { user } = req.session

    if (!user) {
      return res.status(401).json({ authenticated: false, message: 'Unauthorized' })
    }

    try {
      const fullUser = await this.authModel.getUser({ userid: user.id })
      res.json(fullUser)
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  login = async (req, res) => {
    const result = validatePartialUser(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    try {
      const user = await this.authModel.login({ input: result.data })
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_JWT_KEY, {
        expiresIn: '20h'
      })

      // TODO refresh token

      res
        .cookie('acces_token', token, {
          httpOnly: true, // la cookie solo se puede ver desde el servidor
          secure: process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en https
          sameSite: 'strict', // solo se puede acceder desde el mismo dominio
          maxAge: 1000 * 60 * 60
        })
        .json({ user })
    } catch (e) {
      res.status(401).json({ error: e.message })
    }
  }

  register = async (req, res) => {
    const result = validateUser(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    try {
      const user = await this.authModel.register({ input: result.data })
      res.json({ _user: user })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  logout = async (req, res) => {
    res.clearCookie('acces_token', {
      httpOnly: true, // Misma configuración que al crear
      secure: process.env.NODE_ENV === 'production', // Misma configuración que al crear
      sameSite: 'strict', // Misma configuración que al crear
      path: '/' // El mismo path usado cuando creaste la cookie
    })
    return res.json({ message: 'Logout successful' })

    /* res
      .clearCookie('acces_token')
      .json({ message: 'logout succsecfull' }) */
  }

  checkAuth = async (req, res) => {
    const { user } = req.session

    if (!user) {
      return res.status(401).json({ authenticated: false, message: 'Unauthorized' })
    }

    res.json({ authenticated: true, message: 'Authorized' })
  }
}
