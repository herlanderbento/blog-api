export type PaginationPresenterProps = {
  current_page: number
  per_page: number
  last_page: number
  total: number
}

export class PaginationPresenter {
  current_page: number
  per_page: number
  last_page: number
  total: number

  constructor(props: PaginationPresenterProps) {
    this.current_page = props.current_page || 0;
    this.per_page = props.per_page || 1
    this.last_page = props.last_page || this.current_page
    this.total = props.total || 0
  }
}
