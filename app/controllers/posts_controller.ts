import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import { DeletePostUseCase } from '../../src/core/post/application/use_cases/delete_post/delete_post.use-case.js'
import { PostLucidRepository } from '../../src/core/post/infra/db/lucid/post_lucid.repository.js'
import { CreatePostUseCase } from '../../src/core/post/application/use_cases/create_post/create_post.use_case.js'
import { GetPostUseCase } from '../../src/core/post/application/use_cases/get_post/get_post.use_case.js'
import { UpdatePostUseCase } from '../../src/core/post/application/use_cases/update_post/update_post.use-case.js'
import { CategoryLucidRepository } from '../../src/core/category/infra/db/lucid/category_lucid.repository.js'
import {
  ListPostsOutput,
  ListPostsUseCase,
} from '../../src/core/post/application/use_cases/list_posts/list_posts.use_case.js'
import { PostOutput } from '../../src/core/post/application/use_cases/common/post_output.js'
import { PostPresenter, PostCollectionPresenter } from '../presenters/posts.presenter.js'
import {
  createPostValidator,
  listPostsValidator,
  updatePostValidator,
} from '#validators/post_validator'

@inject()
export default class PostsController {
  private createUseCase: CreatePostUseCase
  private listUseCase: ListPostsUseCase
  private getUseCase: GetPostUseCase
  private updateUseCase: UpdatePostUseCase
  private deleteUseCase: DeletePostUseCase

  constructor(
    private postRepo: PostLucidRepository,
    private categoryRepo: CategoryLucidRepository
  ) {
    this.createUseCase = new CreatePostUseCase(this.postRepo, this.categoryRepo)
    this.listUseCase = new ListPostsUseCase(this.postRepo, this.categoryRepo)
    this.getUseCase = new GetPostUseCase(this.postRepo, this.categoryRepo)
    this.updateUseCase = new UpdatePostUseCase(this.postRepo, this.categoryRepo)
    this.deleteUseCase = new DeletePostUseCase(this.postRepo)
  }

  async index({ request, response }: HttpContext) {
    const input = await request.validateUsing(listPostsValidator)

    const output = await this.listUseCase.execute(input)

    return response.ok(this.serializers(output))
  }

  async store({ request, response }) {
    const input = await request.validateUsing(createPostValidator)

    const output = await this.createUseCase.execute(input)

    return response.created(this.serialize(output))
  }

  async show({ request, response }: HttpContext) {
    const input = await request.param('id')

    const output = await this.getUseCase.execute({ id: input })

    return response.ok(this.serialize(output))
  }

  async update({ request, response }: HttpContext) {
    const postId = await request.param('id')
    const input = await request.validateUsing(updatePostValidator)

    const output = await this.updateUseCase.execute({
      ...input,
      id: postId,
    })

    return response.ok(this.serialize(output))
  }

  async destroy({ request, response }: HttpContext) {
    const postId = await request.param('id')

    await this.deleteUseCase.execute({ id: postId })

    return response.noContent()
  }

  private serialize(output: PostOutput) {
    return {
      data: new PostPresenter(output),
    }
  }

  private serializers(output: ListPostsOutput) {
    return new PostCollectionPresenter(output).serialize()
  }
}
