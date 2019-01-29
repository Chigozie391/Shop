export interface IQuery {
  isShipped?: boolean;
  lowItems?: boolean;
  deleted?: boolean;
  sortBy: string;
  isSortAscending: string;
  pageIndex: number;
  pageSize: number;
}
