import { inject } from '@adonisjs/core'
import {
  createCategoryValidator,
  listCategoriesValidator,
  updateCategoryValidator,
} from '#validators/category_validator'
import type { HttpContext } from '@adonisjs/core/http'
import { CreateCategoryUseCase } from '../../src/core/category/application/use_cases/create_category/create_category.use_case.js'
import { CategoryLucidRepository } from '../../src/core/category/infra/db/lucid/category_lucid.repository.js'
import {
  ListCategoriesOutput,
  ListCategoriesUseCase,
} from '../../src/core/category/application/use_cases/list_categories/list_categories.use_case.js'
import { CategoryOutput } from '../../src/core/category/application/use_cases/common/category_output.js'

import { GetCategoryUseCase } from '../../src/core/category/application/use_cases/get_category/get_category.use_case.js'
import { UpdateCategoryUseCase } from '../../src/core/category/application/use_cases/update_category/update_category.use-case.js'
import { DeleteCategoryUseCase } from '../../src/core/category/application/use_cases/delete_category/delete_category.use-case.js'
import {
  CategoryPresenter,
  CategoryCollectionPresenter,
} from '../presenters/categories.presenter.js'

@inject()
export default class CategoriesController {
  private createUseCase: CreateCategoryUseCase
  private listUseCase: ListCategoriesUseCase
  private getUseCase: GetCategoryUseCase
  private updateUseCase: UpdateCategoryUseCase
  private deleteUseCase: DeleteCategoryUseCase

  constructor(private categoryRepo: CategoryLucidRepository) {
    this.createUseCase = new CreateCategoryUseCase(this.categoryRepo)
    this.listUseCase = new ListCategoriesUseCase(this.categoryRepo)
    this.getUseCase = new GetCategoryUseCase(this.categoryRepo)
    this.updateUseCase = new UpdateCategoryUseCase(this.categoryRepo)
    this.deleteUseCase = new DeleteCategoryUseCase(this.categoryRepo)
  }

  async index({ request, response }: HttpContext) {
    const input = await request.validateUsing(listCategoriesValidator)

    const output = await this.listUseCase.execute(input)

    return response.ok(this.serializers(output))
  }

  async store({ request, response }: HttpContext) {
    const input = await request.validateUsing(createCategoryValidator)

    const output = await this.createUseCase.execute(input)

    return response.created(this.serialize(output))
  }

  async show({ request, response }: HttpContext) {
    const input = await request.param('id')

    const output = await this.getUseCase.execute({ id: input })

    return response.ok(this.serialize(output))
  }

  async update({ request, response }: HttpContext) {
    const categoryId = await request.param('id')
    const input = await request.validateUsing(updateCategoryValidator)

    const output = await this.updateUseCase.execute({
      id: categoryId,
      ...input,
    })

    return response.ok(this.serialize(output))
  }

  async destroy({ request, response }: HttpContext) {
    const categoryId = await request.param('id')

    await this.deleteUseCase.execute({ id: categoryId })

    return response.noContent()
  }

  private serialize(output: CategoryOutput) {
    return {
      data: new CategoryPresenter(output),
    }
  }

  private serializers(output: ListCategoriesOutput) {
    return new CategoryCollectionPresenter(output).serialize()
  }
}
