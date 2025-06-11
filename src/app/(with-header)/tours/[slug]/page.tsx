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
import { bookingApi } from '@/lib/api/booking';
import { tourApi } from '@/lib/api/tour';
import { BookingFormValues, bookingSchema } from '@/lib/schemas/tour';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CheckCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { notFound, useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { BookingForm } from './components/BookingForm';
import TourInfo from './components/TourInfo';

export default function TourDetailPage() {
  const params = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { data: session } = useSession();

  const { slug } = params;

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

  if (slug === 'undefined' || !tourResponse) {
    return notFound();
  }

  const { mutate: createBooking } = useMutation({
    mutationFn: bookingApi.createBooking,
    onSuccess: (data, variables) => {
      setShowConfirmation(true);
      // reset();
    },
    onError: (error: unknown) => {
      toast('Yêu cầu không thành công', {
        description: 'Có lỗi xảy ra',
      });
    },
  });

  const handleSubmit = async (data: BookingFormValues) => {
    if (!session?.user?.id) {
      toast('Yêu cầu không thành công', {
        description: 'Vui lòng đăng nhập để đặt tour',
      });
      return;
    }
    try {
      createBooking({
        tourId: tour?._id,
        userId: session?.user.id,
        tourStartDate: data.date.from,
        tourEndDate: data.date.to,
        numberOfParticipants: data.quantity,
        phoneNumber: data.phoneNumber,
      });
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

  return (
    <div className="container mx-auto px-4 py-8 mt-20 md:mt-28">
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
        <h1 className="mb-4 text-4xl md:text-5xl text-secondary font-bold text-center">
          {tour?.title}
        </h1>
        <div className="w-28 h-1 bg-secondary mx-auto rounded-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-y-8">
          <div className="col-span-1 md:sticky md:top-28">
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
              <CheckCircle className="h-6 w-6 text-secondary" />
            </div>
            <AlertDialogTitle className="text-xl font-semibold text-foreground">
              Yêu cầu đã được ghi nhận
            </AlertDialogTitle>
            <AlertDialogDescription className="text-foreground mt-2">
              Tư vấn viên sẽ liên hệ với bạn sớm nhất. Hãy kiểm tra lịch sử đặt tour trong trang cá
              nhân.
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
