import { IUseCase } from "../../../../shared/application/use_case.interface.js";
import { NotFoundError } from "../../../../shared/domain/errors/not_found.error.js";
import { Category } from "../../../domain/category.js";
import { CategoryRepository } from "../../../domain/category.repository.js";
import { CategoryOutputMapper, CategoryOutput } from "../common/category_output.js";

export type UpdateCategoryInput = {
  id: string;
  name?: string;
  description?: string | null;
  is_active?: boolean;
};
export class UpdateCategoryUseCase
  implements IUseCase<UpdateCategoryInput, UpdateCategoryOutput>
{
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    const category = await this.categoryRepo.findById(input.id);

    if (!category) {
      throw new NotFoundError(input.id, Category);
    }

    input.name && category.changeName(input.name);

    if (input.description !== undefined) {
      category.changeDescription(input.description);
    }

    if (input.is_active === true) {
      category.activate();
    }

    if (input.is_active === false) {
      category.deactivate();
    }

    await this.categoryRepo.update(category);

    return CategoryOutputMapper.toOutput(category);
  }
}

export type UpdateCategoryOutput = CategoryOutput;
