export interface ApiErrorResponse {
  success: false;
  message: string;
  fieldErrors?: {
    [key: string]: string[];
  };
}

// Type cho axios error
export interface AxiosError {
  response?: {
    data: ApiErrorResponse;
    status: number;
    statusText: string;
  };
  request?: any;
  message?: string;
}
