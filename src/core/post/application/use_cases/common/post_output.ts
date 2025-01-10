import { Category } from '../../../../category/domain/category.js'
import { Post } from '../../../domain/post.js'

export type PostCategoryOutput = {
  id: string
  name: string
  created_at: Date
}

export type PostOutput = {
  id: string
  user_id: string
  category_id: string
  category: PostCategoryOutput
  title: string
  slug: string
  content: string
  image_url: string | null
  created_at: Date
  updated_at: Date
}

export class PostOutputMapper {
  static toOutput(entity: Post, category: Category): PostOutput {
    return {
      id: entity.id.toString(),
      user_id: entity.user_id,
      category_id: entity.category_id,
      category: {
        id: category.id.toString(),
        name: category.name,
        created_at: category.created_at,
      },
      title: entity.title,
      slug: entity.slug.value,
      content: entity.content,
      image_url: entity.image_url,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    }
  }
}
