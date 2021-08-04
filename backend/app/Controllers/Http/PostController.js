'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post')
/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const posts = await Post.query().with('user').fetch()

    return posts
  }

  async store ({ request, auth }) {
    const data = request.only(['image', 'title', 'post'])

    const post = await Post.create({userId: auth.user.id, ...data})

    return post
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const post = await Post.findOrFail(params.id)

    return post
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth }) {
    const post = await Post.findOrFail(params.id)
    const data = request.all()
    if (data.image != null && data.image != post.image) {
      post.image = data.image
    }
    if (data.title != null && data.title != post.title) {
      post.title = data.title
    }
    if (data.post != null && data.post != post.post) {
      post.post = data.post
    }
    post.userId = auth.user.id
    post.id = params.id

    await post.save()

    return post
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    const post = await Post.findOrFail(params.id)

    if (auth.user.IsAdministrator != true) {
      return response.json("Only administrator can do this action")
    }else{
      await post.delete()
    }

    return response.json("Post deleted")
  }
}

module.exports = PostController
