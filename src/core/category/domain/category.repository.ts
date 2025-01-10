import { ISearchableRepository } from '../../shared/domain/repository/repository_interface.js'
import { SearchParams } from '../../shared/domain/repository/search_params.js'
import { SearchResult } from '../../shared/domain/repository/search_result.js'
import { Category } from './category.js'

export type CategoryFilter = string

export class CategorySearchParams extends SearchParams<CategoryFilter> {}

export class CategorySearchResult extends SearchResult<Category> {}

export abstract class CategoryRepository extends ISearchableRepository<
  Category,
  CategoryFilter,
  CategorySearchParams,
  CategorySearchResult
> {
  abstract findByIds(entity_ids: string[]): Promise<Category[]>
}
