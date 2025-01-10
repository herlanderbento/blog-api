import { IUseCase } from '../../../../shared/application/use_case.interface.js'
import { NotFoundError } from '../../../../shared/domain/errors/not_found.error.js'
import { Category } from '../../../domain/category.js'
import { CategoryRepository } from '../../../domain/category.repository.js'
import { CategoryOutputMapper, CategoryOutput } from '../common/category_output.js'

export class GetCategoryUseCase implements 
IUseCase<GetCategoryInput, GetCategoryOutput> {
  constructor(private categoryRepo: CategoryRepository) {}

  async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
    const category = await this.categoryRepo.findById(input.id)

    if (!category) {
      throw new NotFoundError(input.id, Category)
    }

    return CategoryOutputMapper.toOutput(category)
  }
}

export type GetCategoryInput = {
  id: string
}

export type GetCategoryOutput = CategoryOutput
