import { Category } from '../../../../category/domain/category.js'
import { CategoryRepository } from '../../../../category/domain/category.repository.js'
import { IUseCase } from '../../../../shared/application/use_case.interface.js'
import { NotFoundError } from '../../../../shared/domain/errors/not_found.error.js'
import { Post } from '../../../domain/post.js'
import { PostRepository } from '../../../domain/post.repository.js'
import { PostOutput, PostOutputMapper } from '../common/post_output.js'

export type UpdatePostInput = {
  id: string
  category_id?: string
  title?: string
  content?: string
  image_url?: string
}
export class UpdatePostUseCase 
  implements IUseCase<UpdatePostInput, UpdatePostOutput> {
    constructor(
      private postRepo: PostRepository,
      private categoryRepo: CategoryRepository
    ) {}

    async execute(input: UpdatePostInput): Promise<UpdatePostOutput> {
      const post = await this.postRepo.findById(input.id)

      if (!post) {
        throw new NotFoundError(input.id, Post)
      }

      const category = await this.categoryRepo.findById(input.category_id!)

      if (!category) {
        throw new NotFoundError(input.id, Category)
      }

      input.category_id && post.changeCategoryId(input.category_id)

      input.title && post.changeTitle(input.title)

      input.content && post.changeContent(input.content)

      if (input.image_url !== undefined) {
        post.changeImageUrl(input.image_url)
      }

      await this.postRepo.update(post)

      return PostOutputMapper.toOutput(post, category)
    }
}

export type UpdatePostOutput = PostOutput
