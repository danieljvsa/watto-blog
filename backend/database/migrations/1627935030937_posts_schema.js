'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments('id').primary()
      table.string('image').notNullable()
      table.string('title').notNullable()
      table.string('post').notNullable()
      table.integer('userId').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.schema.dropTable('posts')
  }
}

module.exports = PostsSchema
