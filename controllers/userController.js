import { validatePartialUser } from '../schemas/index.js'

export class UserController {
  constructor ({ userModel }) {
    this.userModel = userModel
  }

  update = async (req, res) => {
    const { userData } = req.body
    const { user } = req.session
    if (!user) return res.status(401).json({ authenticated: false, message: 'Unauthorized' })

    const result = validatePartialUser(req.body.userData)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    try {
      const updateUser = await this.userModel.update({ userData, id: user.id })
      res.json({ user: updateUser })
    } catch (error) {
      res.status(400)
    }
  }

  resetPassword = async (req, res) => {
    const { password } = req.body
    const { user } = req.session
    if (!user) return res.status(401).json({ authenticated: false, message: 'Unauthorized' })
    try {
      const isCorrect = await this.userModel.ckechPassword({ oldPassword: password.oldPassword, id: user.id })
      if (!isCorrect) {
        return res.status(400).json({ error: 'Incorrect Password' })
      }
      const result = validatePartialUser({ password: password.newPassword })
      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error) })
      }
    } catch (e) {
      return res.status(400).json({ error: 'Error' })
    }

    try {
      const passwordChanged = await this.userModel.changePassword({ newPassword: password.newPassword, id: user.id })
      return res.json({ changedPassoword: passwordChanged })
    } catch (e) {
      return res.status(400).json({ error: 'Error' })
    }
  }

  delete = async (req, res) => {

  }
}
