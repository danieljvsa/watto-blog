'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'AuthController.register').middleware('auth')
Route.get('/users', 'AuthController.index').middleware('auth')
Route.post('/authenticate', 'AuthController.authenticate')
Route.put('/users/:id', 'AuthController.update').middleware('auth')
Route.delete('/users/:id', 'AuthController.destroy').middleware('auth')

Route.group(() => {
  Route.resource('posts', 'PostController').apiOnly()
}).middleware('auth')
