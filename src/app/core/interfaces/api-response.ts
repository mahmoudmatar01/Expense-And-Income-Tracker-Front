export interface ApiResponse<T> {
  data: T;
  success: boolean;
}

export interface PaginatedData<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; 
  first: boolean;
  last: boolean;
  empty: boolean;
}
