import { Tour } from '@/types/tour.types';
import axiosClient from '../axios';

export interface ToursResponse {
  tours: Tour[];
  hasMore: boolean;
  total: number;
  currentPage: number;
  totalPages: number;
}
export interface TourResponse {
  tour: Tour;
  success: boolean;
}
export interface TourFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  isHot?: boolean;
  hasDiscount?: boolean;
}
export interface BookingValues {
  tourId?: string;
  userId?: string;
  numberOfParticipants?: number;
  phoneNumber?: string;
  tourStartDate?: Date;
  tourEndDate?: Date;
}
export interface BookingResponse {
  data: any;
  success: boolean;
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

    const { page = 1, limit = 7, search, sort, isHot, hasDiscount } = queryParams;

    return axiosClient.get('/tours', {
      params: {
        page,
        limit,
        ...(search && { search }),
        ...(sort && { sort }),
        ...(isHot !== undefined && { isHot }),
        ...(hasDiscount !== undefined && { hasDiscount }),
      },
    });
  },
  getTourBySlug: async (slug: string): Promise<TourResponse> => {
    return axiosClient.get(`/tours/${slug}`);
  },
  createBooking: async (bookingData: BookingValues): Promise<BookingResponse> => {
    return axiosClient.post('/bookings', bookingData);
  },
};
