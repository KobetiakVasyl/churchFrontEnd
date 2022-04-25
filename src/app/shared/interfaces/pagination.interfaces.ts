export interface IPagingInfo {
  limit: number;
  offset: number;
}

export interface PartialList<T> {
  records: T[];
  totalCount: number;
}
