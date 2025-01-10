import PostModel from '../../../../../../app/models/post.js'
import { Slug } from '../../../../shared/domain/value_object/slug.vo.js'
import { Post, PostId } from '../../../domain/post.js'

export class PostModelMapper {
  static toModel(entity: Post) {
    return {
      id: entity.id.value,
      user_id: entity.user_id,
      category_id: entity.category_id,
      title: entity.title,
      slug: entity.slug,
      content: entity.content,
      image_url: entity.image_url,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    }
  }
  static toEntity(model: PostModel) {
    return new Post({
      id: new PostId(model.id),
      user_id: model.user_id,
      category_id: model.category_id,
      title: model.title,
      slug: Slug.create(model.slug),
      content: model.content,
      image_url: model.image_url,
      created_at: model.created_at,
      updated_at: model.updated_at,
    })
  }
}
