'use client';

import { Booking, bookingApi } from '@/lib/api/booking';
import { formatCurrency } from '@/utils/currency';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Calendar, CalendarClock, MapPin, Phone, Users } from 'lucide-react';

interface Props {
  userId: string;
}

export const BookingContent = ({ userId }: Props) => {
  const {
    data: bookingsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => bookingApi.getBookings(userId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Không thể tải danh sách đặt tour
        </h3>
        <p className="text-foreground-secondary">
          Đã xảy ra lỗi khi tải danh sách đặt tour. Vui lòng thử lại sau.
        </p>
      </motion.div>
    );
  }

  if (!bookingsData?.bookings || bookingsData.bookings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">🏝️</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Chưa có tour nào được đặt</h3>
        <p className="text-foreground-secondary">
          Hãy khám phá và đặt tour để bắt đầu chuyến phiêu lưu của bạn
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-secondary/15 rounded-lg">
          <Calendar className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Các tour đã đặt</h2>
          <p className="text-foreground-secondary text-sm">
            {bookingsData.bookings.length} tour đã đặt và chờ xác nhận
          </p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-6 mt-6">
        {bookingsData.bookings.map((booking: Booking, index: number) => (
          <BookingCard key={booking._id} booking={booking} index={index} />
        ))}
      </div>
    </div>
  );
};

interface BookingCardProps {
  booking: Booking;
  index: number;
}

const BookingCard = ({ booking, index }: BookingCardProps) => {
  const tourStartDate = new Date(booking.tourStartDate);
  const tourEndDate = new Date(booking.tourEndDate);
  const bookingDate = new Date(booking.bookingDate);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const tourInfo = typeof booking.tourId === 'object' ? booking.tourId : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`border rounded-lg overflow-hidden border-orange-200 bg-orange-50`}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Tour Image */}
          <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src={tourInfo?.thumbnail || '/placeholder.svg?height=128&width=128'}
              alt={tourInfo?.title || 'Tour'}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tour Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {tourInfo?.title || `Tour #${booking._id?.slice(-6)}`}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">
                  {tourInfo?.description?.substring(0, 50) || 'Chưa có thông tin'}...
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{booking.numberOfParticipants} người tham gia</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">
                  {formatDate(tourStartDate)} - {formatDate(tourEndDate)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{booking.phoneNumber}</span>
              </div>
            </div>
            {booking.status === 'pending' && (
              <div className="px-4 py-2 mb-4 bg-secondary text-white rounded-lg font-medium inline-block">
                Trạng thái: Chờ xác nhận
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              <span>Đặt ngày: {formatDate(bookingDate)}</span>
            </div>

            {/* Price and Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-sm text-foreground-secondary mb-1">Tổng giá trị</p>
                <p className="text-2xl font-bold text-primary">
                  {tourInfo?.price
                    ? formatCurrency(tourInfo.price * booking.numberOfParticipants)
                    : 'Liên hệ'}
                  VNĐ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
