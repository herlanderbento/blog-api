import { AggregateRoot } from '../../shared/domain/aggregate_root.js'
import { Uuid } from '../../shared/domain/value_object/uuid.vo.js'
import { ValueObject } from '../../shared/domain/value_object.js'

export interface CategoryConstructorProps {
  id?: CategoryId
  name: string
  description?: string | null
  is_active?: boolean
  created_at?: Date
}

export type CategoryCreateCommand = {
  name: string
  description?: string | null
  is_active?: boolean
}

export class CategoryId extends Uuid {}

export class Category extends AggregateRoot {
  id: CategoryId
  name: string
  description: string | null
  is_active: boolean
  created_at: Date

  constructor(props: CategoryConstructorProps) {
    super()
    this.id = props.id ?? new CategoryId()
    this.name = props.name
    this.description = props.description ?? null
    this.is_active = props.is_active ?? true
    this.created_at = props.created_at ?? new Date()
  }

  get entity_id(): ValueObject {
    return this.id
  }

  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props)
    return category
  }

  changeName(name: string): void {
    this.name = name
  }

  changeDescription(description: string | null): void {
    this.description = description
  }

  activate() {
    this.is_active = true
  }

  deactivate() {
    this.is_active = false
  }

  toJSON() {
    return {
      id: this.id.toString(),
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    }
  }
}
