'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments('id').primary()
      table.string('username').unique().notNullable()
      table.string('email').unique().notNullable()
      table.string('password', 80).notNullable()
      table.boolean('IsAdministrator').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.schema.dropTable('users')
  }
}

module.exports = UsersSchema
