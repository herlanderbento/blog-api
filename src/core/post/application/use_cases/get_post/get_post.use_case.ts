import { Category } from '../../../../category/domain/category.js'
import { CategoryRepository } from '../../../../category/domain/category.repository.js'
import { IUseCase } from '../../../../shared/application/use_case.interface.js'
import { NotFoundError } from '../../../../shared/domain/errors/not_found.error.js'
import { Post } from '../../../domain/post.js'
import { PostRepository } from '../../../domain/post.repository.js'
import { PostOutputMapper, PostOutput } from '../common/post_output.js'

export class GetPostUseCase implements IUseCase<GetPostInput, GetPostOutput> {
  constructor(
    private postRepo: PostRepository,
    private categoryRepo: CategoryRepository
  ) {}

  async execute(input: GetPostInput): Promise<GetPostOutput> {
    const post = await this.postRepo.findById(input.id)

    if (!post) {
      throw new NotFoundError(input.id, Post)
    }

    const category = await this.categoryRepo.findById(post.category_id)

    if (!category) {
      throw new NotFoundError(input.id, Category)
    }

    return PostOutputMapper.toOutput(post, category)
  }
}

export type GetPostInput = {
  id: string
}

export type GetPostOutput = PostOutput
