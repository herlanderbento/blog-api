/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
// import AutoSwagger from 'adonis-autoswagger'
// import swagger from '#config/swagger'

const CategoriesController = () => import('#controllers/categories_controller')
const PostsController = () => import('#controllers/posts_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('/categories', CategoriesController)
router.resource('/posts', PostsController)

// router.get('/swagger', async () => {
//   return AutoSwagger.default.docs(router.toJSON(), swagger)
// })

// router.get('/docs', async () => {
//   return AutoSwagger.default.ui('/swagger', swagger)
// })
