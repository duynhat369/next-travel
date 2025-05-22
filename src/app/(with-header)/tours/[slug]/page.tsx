'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { TOURS_PAGE } from '@/constants';
import { tourApi } from '@/lib/api/tour';
import { BookingFormValues, bookingSchema } from '@/lib/schemas/tour';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BookingForm } from './components/BookingForm';
import TourInfo from './components/TourInfo';

export default function TourDetailPage() {
  const params = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { slug } = params;

  if (slug === 'undefined') {
    return notFound();
  }

  const {
    register: bookingRegister,
    handleSubmit: handleSubmitBooking,
    formState: { errors: bookingErrors, isSubmitting: isLoginSubmitting },
    watch,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      quantity: 1,
      date: {
        from: new Date(),
        to: new Date(),
      },
      phoneNumber: '',
    },
  });
  const quantityWatch = watch('quantity');

  const { data: tourResponse, isLoading } = useQuery({
    queryKey: ['tour', slug],
    queryFn: async () => tourApi.getTourBySlug(slug as string),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  const { tour } = tourResponse || {};

  const handleSubmit = async (data: BookingFormValues) => {
    try {
      // Chạy API bookingRequest
      // const response = await bookingRequest(data);

      // if (response.success) {
      setShowConfirmation(true);
      // }
    } catch (error) {
      // Xử lý lỗi
      console.error('Booking error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // if (bookingComplete) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 0, y: 20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ duration: 0.5 }}
  //       className="max-w-4xl mx-auto p-6"
  //     >
  //       <Alert className="bg-green-50 border-green-200">
  //         <Check className="h-5 w-5 text-green-600" />
  //         <AlertTitle className="text-green-800 text-lg font-medium">Đặt tour thành công!</AlertTitle>
  //         <AlertDescription className="text-green-700">
  //           Cảm ơn bạn đã đặt tour {tour.name}. Chúng tôi sẽ liên hệ với bạn sớm để xác nhận chi tiết.
  //         </AlertDescription>
  //       </Alert>
  //       <Button
  //         className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
  //         // onClick={() => router.push("/tours")}
  //       >
  //         Xem các tour khác
  //       </Button>
  //     </motion.div>
  //   );
  // }

  return (
    <div className="container mx-auto px-4 py-8 mt-28">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${TOURS_PAGE}`}>Cung đường</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Chi tiết</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="">
        <h1 className="text-4xl md:text-5xl text-secondary font-bold text-center mb-8">
          {tour?.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:sticky md:top-28 md:self-start">
            <BookingForm
              tour={tour}
              bookingRegister={bookingRegister}
              bookingErrors={bookingErrors}
              quantityWatch={quantityWatch}
              handleBookingSubmit={handleSubmitBooking(handleSubmit)}
            />
          </div>
          <TourInfo tour={tour} />
        </div>
      </div>
      {/* Dialog thông báo */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="max-w-md bg-white">
          <AlertDialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <AlertDialogTitle className="text-xl font-semibold text-gray-900">
              Yêu cầu đã được ghi nhận
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 mt-2">
              Chúng tôi đã ghi nhận thông tin thanh toán của bạn, tư vấn viên sẽ liên hệ với bạn sớm
              nhất.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="w-full bg-secondary hover:bg-secondary/90 text-white"
              onClick={() => setShowConfirmation(false)}
            >
              Đóng
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
