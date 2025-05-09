import { Tour } from '@/types/tour.types';
import axiosClient from '../axios';

export interface ToursResponse {
  tours: Tour[];
  hasMore: boolean;
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface TourFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'price' | 'createdAt' | string;
  sortOrder?: 'asc' | 'desc' | string;
  isHot?: boolean;
  hasDiscount?: boolean;
}

export const tourApi = {
  getTours: async (params: TourFilterParams = {}): Promise<ToursResponse> => {
    // Hỗ trợ tương thích ngược khi params là số (page)
    let queryParams: TourFilterParams = {};

    if (typeof params === 'number') {
      queryParams = { page: params, limit: 3 };
    } else {
      queryParams = { ...params };
    }

    const { page = 1, limit = 3, search, sortBy, sortOrder, isHot, hasDiscount } = queryParams;

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
