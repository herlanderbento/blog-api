import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Post extends BaseModel {
  static table = 'posts'

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare user_id: string

  @column()
  declare category_id: string

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare content: string

  @column()
  declare image_url: string | null

  @column()
  declare created_at: Date

  @column()
  declare updated_at: Date
}
