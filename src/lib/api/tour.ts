import { Tour } from '@/types/tour.types';
import axiosClient from '../axios';

export interface ToursResponse {
  tours: Tour[];
  hasMore: boolean;
  total: number;
  currentPage: number;
  totalPages: number;
}

export enum TourSortBy {
  PRICE = 'price',
  CREATED_AT = 'createdAt',
}
export interface TourFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: TourSortBy;
  sortOrder?: 'asc' | 'desc' | string;
  isHot?: boolean;
  hasDiscount?: boolean;
}

export const tourApi = {
  getTours: async (params: TourFilterParams = {}): Promise<ToursResponse> => {
    // Hỗ trợ tương thích ngược khi params là số (page)
    let queryParams: TourFilterParams = {};

    if (typeof params === 'number') {
      queryParams = { page: params, limit: 7 };
    } else {
      queryParams = { ...params };
    }

    const { page = 1, limit = 7, search, sortBy, sortOrder, isHot, hasDiscount } = queryParams;

    return axiosClient.get('/tours', {
      params: {
        page,
        limit,
        ...(search && { search }),
        ...(sortBy && { sortBy }),
        ...(sortOrder && { sortOrder }),
        ...(isHot !== undefined && { isHot }),
        ...(hasDiscount !== undefined && { hasDiscount }),
      },
    });
  },
};
