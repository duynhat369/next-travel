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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request?: any;
  message?: string;
}
