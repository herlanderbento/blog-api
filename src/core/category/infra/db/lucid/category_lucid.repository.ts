import db from '@adonisjs/lucid/services/db'
import { Category, CategoryId } from '../../../domain/category.js'
import {
  CategorySearchParams,
  CategorySearchResult,
  CategoryRepository,
} from '../../../domain/category.repository.js'
import { CategoryModelMapper } from './category_model.mapper.js'
import { NotFoundError } from '../../../../shared/domain/errors/not_found.error.js'

export class CategoryLucidRepository implements CategoryRepository {
  sortableFields: string[] = ['name', 'created_at']
  async insert(entity: Category): Promise<void> {
    const model = CategoryModelMapper.toModel(entity)
    await db.table('categories').insert(model)
  }

  async bulkInsert(entities: Category[]): Promise<void> {
    const modelsProps = entities.map((entity) => CategoryModelMapper.toModel(entity))
    await db.table('categories').insert(modelsProps)
  }

  async findById(entity_id: string): Promise<Category | null> {
    const model = await db.query().from('categories').where('id', entity_id).first()

    return model ? CategoryModelMapper.toEntity(model) : null
  }

  async findByIds(entity_ids: string[]): Promise<Category[]> {
    const models = await db.query().from('categories').whereIn('id', entity_ids)

    return models.map((model) => CategoryModelMapper.toEntity(model))
  }

  async findAll(): Promise<Category[]> {
    const models = await db.query().from('categories')

    return models.map((model) => CategoryModelMapper.toEntity(model))
  }

  async search(props: CategorySearchParams): Promise<CategorySearchResult> {
    const offset = (props.page - 1) * props.per_page
    const limit = props.per_page

    const orderByColumn =
      props.sort && ['name', 'created_at'].includes(props.sort) ? props.sort : 'created_at'

    const orderByDirection =
      props.sort_dir === 'asc' || props.sort_dir === 'desc' ? props.sort_dir : 'desc'

    const query = db
      .query()
      .from('categories')
      .if(props.filter, (builder) => {
        builder.whereILike('name', `%${props.filter}%`)
      })
      .orderBy(orderByColumn, orderByDirection)

    const [models, total] = await Promise.all([
      query.clone().offset(offset).limit(limit),
      db
        .query()
        .from('categories')
        .if(props.filter, (builder) => {
          builder.whereILike('name', `%${props.filter}%`)
        })
        .count('* as total')
        .first()
        .then((result) => result?.total),
    ])

    return new CategorySearchResult({
      items: models.map((model) => CategoryModelMapper.toEntity(model)),
      total: Number(total),
      current_page: props.page,
      per_page: props.per_page,
    })
  }
  async update(entity: Category): Promise<void> {
    const id = entity.id.value

    const modelProps = CategoryModelMapper.toModel(entity)
    const affectedRows = await db.query().from('categories').where('id', id).update(modelProps)

    if (!affectedRows) {
      throw new NotFoundError(id, this.getEntity())
    }
  }

  async delete(entity_id: string): Promise<void> {
    const affectedRows = await db.query().from('categories').where('id', entity_id).delete()

    if (!affectedRows) {
      throw new NotFoundError(entity_id, this.getEntity())
    }
  }

  getEntity(): new (...args: any[]) => Category {
    return Category
  }
}
