import { AggregateRoot } from '../../shared/domain/aggregate_root.js'
import { Uuid } from '../../shared/domain/value_object/uuid.vo.js'
import { ValueObject } from '../../shared/domain/value_object.js'
import { Slug } from '../../shared/domain/value_object/slug.vo.js'

export interface PostConstructorProps {
  id?: PostId
  user_id: string
  category_id: string
  title: string
  slug?: Slug
  content: string 
  image_url?: string | null
  created_at?: Date
  updated_at?: Date
}

export type PostCreateCommand = {
  user_id: string
  category_id: string
  title: string
  content: string 
  image_url?: string | null
}

export class PostId extends Uuid {}

export class Post extends AggregateRoot {
  id: PostId
  user_id: string
  category_id: string
  title: string
  slug: Slug
  content: string 
  image_url: string | null
  created_at: Date
  updated_at: Date

  constructor(props: PostConstructorProps) {
    super()
    this.id = props.id ?? new PostId()
    this.user_id = props.user_id,
    this.category_id = props.category_id,
    this.title = props.title
    this.slug = Slug.createFromText(props.title)
    this.content = props.content,
    this.image_url = props.image_url ?? null
    this.created_at = props.created_at ?? new Date()
    this.updated_at = props.updated_at ?? new Date()
  }

  get entity_id(): ValueObject {
    return this.id
  }

  static create(props: PostCreateCommand): Post {
    const post = new Post({
      ...props,
      slug: Slug.createFromText(props.title),
    })
    return post
  }

  changeCategoryId(category_id: string): void {
    this.category_id = category_id
  }

  changeTitle(title: string): void {
    this.title = title
  }

  changeContent(content: string): void {
    this.content = content
  }

  changeImageUrl(image_url: string): void {
    this.image_url = image_url
  }


  toJSON() {
    return {
      id: this.id.toString(),
      user_id: this.user_id,
      category_id: this.category_id,
      title: this.title,
      slug: this.slug,
      content: this.content,
      image_url: this.image_url,
      created_at: this.created_at,
      updated_at: this.updated_at,
    }
  }
}
