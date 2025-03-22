export interface Patient {
  id: number;
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  documentPhotoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    from: number;
    lastPage: number;
    perPage: number;
    to: number;
    total: number;
  };
}