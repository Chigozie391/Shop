export interface Query {
  isShipped?: boolean;
  sortBy: string;
  isSortAscending: string;
  pageIndex: number;
  pageSize: number;
}
