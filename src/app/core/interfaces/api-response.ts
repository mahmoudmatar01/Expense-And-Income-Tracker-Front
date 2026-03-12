/** Generic wrapper for standard API responses */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
}

/** Generic wrapper for paginated API responses */
export interface PaginatedData<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // current page (0-indexed)
  first: boolean;
  last: boolean;
  empty: boolean;
}
