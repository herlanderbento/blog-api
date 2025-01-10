import { Category } from '../../../../category/domain/category.js'
import { CategoryRepository } from '../../../../category/domain/category.repository.js'
import { IUseCase } from '../../../../shared/application/use_case.interface.js'
import { NotFoundError } from '../../../../shared/domain/errors/not_found.error.js'
import { Post } from '../../../domain/post.js'
import { PostRepository } from '../../../domain/post.repository.js'
import { PostOutput, PostOutputMapper } from '../common/post_output.js'


export interface CreatePostInput {
  user_id: string
  category_id: string
  title: string
  content: string 
  image_url?: string
}

export class CreatePostUseCase 
  implements IUseCase<CreatePostInput, CreatePostOutput> 
{
  constructor(
    private postRepo: PostRepository,
    private categoryRepo: CategoryRepository
  ) {}

  async execute(input: CreatePostInput): Promise<CreatePostOutput> {
    const category = await this.categoryRepo.findById(input.category_id)

    if(!category) {
      throw new NotFoundError(input.category_id, Category);
    }

    const post = Post.create(input)

    await this.postRepo.insert(post)

    return PostOutputMapper.toOutput(post, category)
  }
}

export type CreatePostOutput = PostOutput
