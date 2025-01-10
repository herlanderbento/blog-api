import { ApplicationService } from '@adonisjs/core/types'
import { CategoryLucidRepository } from '../../src/core/category/infra/db/lucid/category_lucid.repository.js'
import { CategoryRepository } from '../../src/core/category/domain/category.repository.js'
import { PostRepository } from '../../src/core/post/domain/post.repository.js'
import { PostLucidRepository } from '../../src/core/post/infra/db/lucid/post_lucid.repository.js'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}
  public register() {
    this.app.container.singleton(CategoryRepository, () => {
      return new CategoryLucidRepository()
    })

    this.app.container.singleton(PostRepository, () => {
      return new PostLucidRepository()
    })
  }
}
