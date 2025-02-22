import { Category } from '../../../domain/category.js'

export type CategoryOutput = {
  id: string
  name: string
  description: string | null
  is_active: boolean
  created_at: Date
}

export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutput {
    return entity.toJSON()
  }
}
