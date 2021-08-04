'use strict'

const User = use('App/Models/User')

class AuthController {
  async register({request, response, auth}){
    if (auth.user.IsAdministrator == true) {
    const data = request.only(['username', 'email', 'password', 'IsAdministrator'])

    const user = await User.create(data)

    return user
    } else {
      response.json('Only adminitrastors can create other users')
    }

  }

  async authenticate({request, auth}){
    const {email, password} = request.all()

    const token = await auth.attempt(email, password)

    return token
  }

  async index({request}){
    const users = await User.all()

    return users
  }

  async destroy ({ params, response, auth }) {
    const user = await User.findOrFail(params.id)

    if (auth.user.IsAdministrator != true) {
      return response.json("Only administrator can do this action")
    }else{
      await user.delete()
    }

    return response.json("User deleted")
  }

  async update ({ params, request, auth, response }) {
    const user = await User.findOrFail(params.id)
    const data = request.all()
    if (auth.user.IsAdministrator == true) {
      if (data.username != null && data.username != user.username) {
        user.username = data.username
      }
      if (data.email != null && data.email != user.email) {
        user.email = data.email
      }
      if (data.IsAdministrator != null && data.IsAdministrator != user.IsAdministrator) {
        user.IsAdministrator = data.IsAdministrator
      }

      await user.save()
      return user
    }else{
      return response.json("Only administrator can do this action")
    }
  }
}

module.exports = AuthController
