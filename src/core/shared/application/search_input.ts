import { SortDirection } from "../domain/repository/search_params.js";

export type SearchInput<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
};
