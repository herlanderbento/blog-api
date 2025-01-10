import CategoryModel from '../../../../../../app/models/category.js'
import { Category, CategoryId } from '../../../domain/category.js'

export class CategoryModelMapper {
  static toModel(entity: Category) {
    return {
      id: entity.id.value,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    }
  }
  static toEntity(model: CategoryModel) {
    return new Category({
      id: new CategoryId(model.id),
      name: model.name,
      description: model.description,
      is_active: model.is_active,
      created_at: model.created_at,
    })
  }
}
