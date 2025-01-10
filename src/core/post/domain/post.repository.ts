import { ISearchableRepository } from '../../shared/domain/repository/repository_interface.js'
import { SearchParams } from '../../shared/domain/repository/search_params.js'
import { SearchResult } from '../../shared/domain/repository/search_result.js'
import { Post } from './post.js'

export type PostFilter = string

export class PostSearchParams extends SearchParams<PostFilter> {}

export class PostSearchResult extends SearchResult<Post> {}

export abstract class PostRepository extends ISearchableRepository<
  Post,
  PostFilter,
  PostSearchParams,
  PostSearchResult
> {
  abstract findByUserId(user_id: string, props: PostSearchParams): Promise<PostSearchResult>
  abstract findByCategoryId(category_id: string, props: PostSearchParams): Promise<PostSearchResult>
}
 