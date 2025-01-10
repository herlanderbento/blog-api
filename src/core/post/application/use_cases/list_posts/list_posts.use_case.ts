import { Category } from "../../../../category/domain/category.js";
import { CategoryRepository } from "../../../../category/domain/category.repository.js";
import { PaginationOutputMapper, PaginationOutput } from "../../../../shared/application/pagination_output.js";
import { IUseCase } from "../../../../shared/application/use_case.interface.js";
import { NotFoundError } from "../../../../shared/domain/errors/not_found.error.js";
import { SortDirection } from "../../../../shared/domain/repository/search_params.js";
import { PostRepository, PostSearchParams, PostSearchResult, PostFilter } from "../../../domain/post.repository.js";
import { PostOutputMapper, PostOutput } from "../common/post_output.js";

export class ListPostsUseCase
  implements IUseCase<ListPostsInput, ListPostsOutput>
{
  constructor(
    private postRepo: PostRepository,
    private categoryRepo: CategoryRepository
  ) {}

  async execute(input: ListPostsInput): Promise<ListPostsOutput> {
    const params = new PostSearchParams(input);
    const searchResult = await this.postRepo.search(params);
    return this.toOutput(searchResult);
  }

  private async toOutput(searchResult: PostSearchResult): Promise<ListPostsOutput> {
    const { items: _items } = searchResult;
    const categoryIds = _items.map((item) => item.category_id);
    const categories = await this.categoryRepo.findByIds(categoryIds);

    const items = _items.map((item) => {
      const category = categories.find(
        (c) => c.id.toString() === item.category_id
      );
      if (!category) {
        throw new NotFoundError(item.category_id, Category);
      }
      return PostOutputMapper.toOutput(item, category);
    });
    
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListPostsInput = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: PostFilter | null;
};

export type ListPostsOutput = PaginationOutput<PostOutput>;
