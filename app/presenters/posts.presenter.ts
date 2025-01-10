import {
  PostCategoryOutput,
  PostOutput,
} from '../../src/core/post/application/use_cases/common/post_output.js'
import { ListPostsOutput } from '../../src/core/post/application/use_cases/list_posts/list_posts.use_case.js'
import { CollectionPresenter } from './shared/collection.presenter.js'
import { PaginationPresenter } from './shared/pagination.presenter.js'

export class PostCategoryPresenter {
  id: string
  name: string
  created_at: Date

  constructor(output: PostCategoryOutput) {
    this.id = output.id
    this.name = output.name
    this.created_at = output.created_at
  }
}

export class PostPresenter {
  id: string
  user_id: string
  category_id: string
  category: PostCategoryPresenter
  title: string
  slug: string
  content: string
  image_url: string | null
  created_at: Date
  updated_at: Date

  constructor(output: PostOutput) {
    this.id = output.id
    this.user_id = output.user_id
    this.category_id = output.category_id
    this.category = {
      id: output.category.id,
      name: output.category.name,
      created_at: output.category.created_at,
    } ,
    this.title = output.title
    this.slug = output.slug
    this.content = output.content
    this.image_url = output.image_url
    this.created_at = output.created_at
    this.updated_at = output.updated_at
  }
}

export class PostCollectionPresenter extends CollectionPresenter {
  data: PostPresenter[]
  meta: PaginationPresenter

  constructor(output: ListPostsOutput) {
    const { items, ...paginationProps } = output
    super(paginationProps)
    this.data = items.map((item) => new PostPresenter(item))
    this.meta = new PaginationPresenter(paginationProps)
  }

  serialize() {
    return {
      data: this.data,
      meta: this.meta,
    }
  }
}
