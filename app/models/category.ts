import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Category extends BaseModel {
  static table = 'categories'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare is_active: boolean

  @column()
  declare created_at: Date
}
