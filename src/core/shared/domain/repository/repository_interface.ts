import { Entity } from '../entity.js'
import { ValueObject } from '../value_object.js'
import { SearchParams } from './search_params.js'
import { SearchResult } from './search_result.js'

export abstract class IRepository<E extends Entity> {
  abstract insert(entity: E): Promise<void>
  abstract bulkInsert(entities: E[]): Promise<void>
  abstract findById(entity_id: string): Promise<E | null>
  abstract findAll(): Promise<E[]>
  abstract update(entity: E): Promise<void>
  abstract delete(entity_id: string): Promise<void>

  abstract getEntity(): new (...args: any[]) => E
}
export abstract class ISearchableRepository<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOutput = SearchResult,
> extends IRepository<E> {
  abstract sortableFields: string[]
  abstract search(props: SearchInput): Promise<SearchOutput>
}
