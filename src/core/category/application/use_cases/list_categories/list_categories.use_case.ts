import { PaginationOutputMapper, PaginationOutput } from "../../../../shared/application/pagination_output.js";
import { IUseCase } from "../../../../shared/application/use_case.interface.js";
import { SortDirection } from "../../../../shared/domain/repository/search_params.js";
import { CategoryRepository, CategorySearchParams, CategorySearchResult, CategoryFilter } from "../../../domain/category.repository.js";
import { CategoryOutputMapper, CategoryOutput } from "../common/category_output.js";

export class ListCategoriesUseCase
  implements IUseCase<ListCategoriesInput, ListCategoriesOutput>
{
  constructor(private categoryRepo: CategoryRepository) {}

  async execute(input: ListCategoriesInput): Promise<ListCategoriesOutput> {
    const params = new CategorySearchParams(input);
    const searchResult = await this.categoryRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategorySearchResult): ListCategoriesOutput {
    const { items: _items } = searchResult;
    const items = _items.map((i) => {
      return CategoryOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListCategoriesInput = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: CategoryFilter | null;
};

export type ListCategoriesOutput = PaginationOutput<CategoryOutput>;
