import { IUseCase } from '../../../../shared/application/use_case.interface.js'
import { Category } from '../../../domain/category.js'
import { CategoryRepository } from '../../../domain/category.repository.js'
import { CategoryOutputMapper, CategoryOutput } from '../common/category_output.js'

export interface CreateCategoryInput {
  name: string
  description?: string | null
  isActive?: boolean
}

export class CreateCategoryUseCase 
  implements IUseCase<CreateCategoryInput, CreateCategoryOutput> 
{
  constructor(private categoryRepo: CategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const entity = Category.create(input)

    await this.categoryRepo.insert(entity)

    return CategoryOutputMapper.toOutput(entity)
  }
}

export type CreateCategoryOutput = CategoryOutput
