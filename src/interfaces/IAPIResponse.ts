export interface IAPIResponse<T> {
    data: T;
    status: number;
    message: string;
  }
  