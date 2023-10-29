export interface PaginatedResponse<T> {
  Items: T[]
  Count: number
  TotalCount: number
}
