import { CategoryOutput } from '../../src/core/category/application/use_cases/common/category_output.js'
import { ListCategoriesOutput } from '../../src/core/category/application/use_cases/list_categories/list_categories.use_case.js'
import { CollectionPresenter } from './shared/collection.presenter.js'
import { PaginationPresenter } from './shared/pagination.presenter.js'

export class CategoryPresenter {
  id: string
  name: string
  description: string | null
  is_active: boolean
  created_at: Date

  constructor(output: CategoryOutput) {
    this.id = output.id
    this.name = output.name
    this.description = output.description
    this.is_active = output.is_active
    this.created_at = output.created_at
  }
}

export class CategoryCollectionPresenter extends CollectionPresenter {
  data: CategoryPresenter[]
  meta: PaginationPresenter

  constructor(output: ListCategoriesOutput) {
    const { items, ...paginationProps } = output
    super(paginationProps)
    this.data = items.map((item) => new CategoryPresenter(item))
    this.meta = new PaginationPresenter(paginationProps)
  }

  serialize() {
    return {
      data: this.data,
      meta: this.meta,
    }
  }
}
