import { Tour } from '@/types/tour.types';
import axiosClient from '../axios';

export interface Booking {
  _id?: string;
  userId:
    | string
    | {
        _id: string;
        name: string;
        email: string;
        avatar?: string;
      };
  tourId: string | Tour;
  bookingDate: Date | string;
  tourStartDate: Date | string;
  tourEndDate: Date | string;
  numberOfParticipants: number;
  phoneNumber: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  statusHistory: any[];
  participants?: any[];
  user?: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface BookingsResponse {
  success: boolean;
  bookings: Booking[];
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    cancelled: number;
    completed: number;
  };
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

export const bookingApi = {
  // Lấy toàn bộ bookings của user (đơn giản hóa, không cần options)
  getBookings: async (userId: string): Promise<BookingsResponse> => {
    return axiosClient.get('/bookings', {
      params: {
        userId,
      },
    });
  },

  createBooking: async (bookingData: BookingValues): Promise<BookingResponse> => {
    return axiosClient.post('/bookings', bookingData);
  },

  // Hủy booking
  cancelBooking: async (bookingId: string): Promise<{ success: boolean; message: string }> => {
    return axiosClient.put(`/bookings/${bookingId}/cancel`);
  },
};
