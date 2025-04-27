import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosClient: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    // Do something before request is sent
    return config;
  },
  function (error: any): Promise<any> {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse): any {
    // Do something with response data
    return response.data;
  },
  function (error: any): Promise<never> {
    return Promise.reject(error);
  }
);

export default axiosClient;
