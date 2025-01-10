import { IUseCase } from "../../../../shared/application/use_case.interface.js";
import { NotFoundError } from "../../../../shared/domain/errors/not_found.error.js";
import { Category } from "../../../domain/category.js";
import { CategoryRepository } from "../../../domain/category.repository.js";

export class DeleteCategoryUseCase
  implements IUseCase<DeleteCategoryInput, DeleteCategoryOutput>
{
  constructor(private categoryRepo: CategoryRepository) {}

  async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    const category = await this.categoryRepo.findById(input.id)

    if (!category) {
      throw new NotFoundError(input.id, Category)
    }
    
    await this.categoryRepo.delete(input.id);
  }
}

export type DeleteCategoryInput = {
  id: string;
};

export type DeleteCategoryOutput = void;
