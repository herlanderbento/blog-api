import { PaginationPresenter, PaginationPresenterProps } from './pagination.presenter.js'

export abstract class CollectionPresenter {
  protected meta: PaginationPresenter

  constructor(props: PaginationPresenterProps) {
    this.meta = new PaginationPresenter(props)
  }

  abstract get data(): any[]
}
