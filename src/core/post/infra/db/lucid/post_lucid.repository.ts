import db from '@adonisjs/lucid/services/db'
import { Post } from '../../../domain/post.js'
import {
  PostSearchParams,
  PostSearchResult,
  PostRepository,
} from '../../../domain/post.repository.js'
import { PostModelMapper } from './post_model.mapper.js'
import { NotFoundError } from '../../../../shared/domain/errors/not_found.error.js'

export class PostLucidRepository implements PostRepository {
  sortableFields: string[] = ['title', 'created_at']
  async insert(entity: Post): Promise<void> {
    const model = PostModelMapper.toModel(entity)
    await db.table('posts').insert(model)
  }

  async bulkInsert(entities: Post[]): Promise<void> {
    const modelsProps = entities.map((entity) => PostModelMapper.toModel(entity))
    await db.table('posts').insert(modelsProps)
  }

  async findById(entity_id: string): Promise<Post | null> {
    const model = await db.query().from('posts').where('id', entity_id).first()

    return model ? PostModelMapper.toEntity(model) : null
  }

  async findAll(): Promise<Post[]> {
    const models = await db.query().from('posts')

    return models.map((model) => PostModelMapper.toEntity(model))
  }

  findByUserId(user_id: string, props: PostSearchParams): Promise<PostSearchResult> {
    throw new Error('Method not implemented.')
  }
  findByCategoryId(category_id: string, props: PostSearchParams): Promise<PostSearchResult> {
    throw new Error('Method not implemented.')
  }

  async search(props: PostSearchParams): Promise<PostSearchResult> {
    const offset = (props.page - 1) * props.per_page
    const limit = props.per_page

    const orderByColumn =
      props.sort && ['title', 'created_at'].includes(props.sort) ? props.sort : 'created_at'

    const orderByDirection =
      props.sort_dir === 'asc' || props.sort_dir === 'desc' ? props.sort_dir : 'desc'

    const query = db
      .query()
      .from('posts')
      .if(props.filter, (builder) => {
        builder.whereILike('title', `%${props.filter}%`)
      })
      .orderBy(orderByColumn, orderByDirection)

    const [models, total] = await Promise.all([
      query.clone().offset(offset).limit(limit),
      db
        .query()
        .from('posts')
        .if(props.filter, (builder) => {
          builder.whereILike('title', `%${props.filter}%`)
        })
        .count('* as total')
        .first()
        .then((result) => result?.total),
    ])

    return new PostSearchResult({
      items: models.map((model) => PostModelMapper.toEntity(model)),
      total: Number(total),
      current_page: props.page,
      per_page: props.per_page,
    })
  }
  async update(entity: Post): Promise<void> {
    const id = entity.id.value

    const modelProps = PostModelMapper.toModel(entity)
    const affectedRows = await db.query().from('posts').where('id', id).update(modelProps)

    if (!affectedRows) {
      throw new NotFoundError(id, this.getEntity())
    }
  }

  async delete(entity_id: string): Promise<void> {
    const affectedRows = await db.query().from('posts').where('id', entity_id).delete()

    if (!affectedRows) {
      throw new NotFoundError(entity_id, this.getEntity())
    }
  }

  getEntity(): new (...args: any[]) => Post {
    return Post
  }
}
