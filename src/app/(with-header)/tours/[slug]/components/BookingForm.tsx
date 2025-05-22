'use client';

import type React from 'react';

import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { AlertCircle, CalendarIcon, Send } from 'lucide-react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { BookingFormValues } from '@/lib/schemas/tour';
import { cn } from '@/lib/utils';
import type { Tour } from '@/types/tour.types';

interface Props {
  tour?: Tour;
  bookingRegister: UseFormRegister<BookingFormValues>;
  bookingErrors: FieldErrors<BookingFormValues>;
  quantityWatch: number;
  handleBookingSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const BookingForm = ({
  tour,
  bookingRegister,
  bookingErrors,
  quantityWatch,
  handleBookingSubmit,
}: Props) => {
  const [date, setDate] = useState<DateRange | undefined>({ from: new Date(), to: new Date() });

  const pricePerPerson = tour?.price || 0;
  const totalPrice = pricePerPerson * quantityWatch;
  const formattedPrice = new Intl.NumberFormat('vi-VN').format(pricePerPerson);
  const formattedTotal = new Intl.NumberFormat('vi-VN').format(totalPrice);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative max-w-md mx-auto"
    >
      <Card className="relative overflow-hidden border border-muted shadow-xl bg-white">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-secondary" />

        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-teal-600 to-secondary bg-clip-text text-transparent">
            Form Đặt Tour
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            <motion.div
              custom={0}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="date-range" className="flex items-center gap-1.5">
                Chọn ngày
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date-range"
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal bg-white border-input transition-colors cursor-pointer truncate',
                      !date && 'text-slate-500'
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4 text-secondary" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, 'dd/MM/yyyy')} - {format(date.to, 'dd/MM/yyyy')}
                        </>
                      ) : (
                        format(date.from, 'dd/MM/yyyy')
                      )
                    ) : (
                      'Chọn ngày'
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-input shadow-lg" align="start">
                  <Calendar
                    mode="range"
                    selected={{
                      from: date?.from,
                      to: date?.to,
                    }}
                    onSelect={setDate}
                    numberOfMonths={2}
                    initialFocus
                    className="rounded-md"
                  />
                </PopoverContent>
              </Popover>
              {bookingErrors.date && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-sm text-red-500 flex items-center gap-1.5 pl-1"
                >
                  <AlertCircle className="h-3.5 w-3.5" />
                  {bookingErrors.date.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="quantity" className="flex items-center gap-1.5">
                Số lượng đăng ký (người)
              </Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                className="bg-white border-input"
                {...bookingRegister('quantity', { valueAsNumber: true })}
              />
              {bookingErrors.quantity && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-sm text-red-500 flex items-center gap-1.5 pl-1"
                >
                  <AlertCircle className="h-3.5 w-3.5" />
                  {bookingErrors.quantity.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="quantity" className="flex items-center gap-1.5">
                Số điện thoại
              </Label>
              <Input
                id="phoneBumber"
                className="bg-white border-input"
                {...bookingRegister('phoneNumber')}
              />
              {bookingErrors.phoneNumber && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-sm text-red-500 flex items-center gap-1.5 pl-1"
                >
                  <AlertCircle className="h-3.5 w-3.5" />
                  {bookingErrors.phoneNumber.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="pt-2 space-y-4"
            >
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex justify-between text-foreground">
                  <span>Giá:</span>
                  <span>{formattedPrice} VNĐ/Người</span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-foreground">Thành tiền:</span>
                    <span className="text-secondary">{formattedTotal} VNĐ</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-foreground bg-amber-50 border border-amber-100 rounded-lg p-3 flex gap-2">
                <AlertCircle className="h-5 w-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-700">Lưu ý:</span> Giá tour bao gồm VAT,
                  chi phí sinh hoạt trong suốt hành trình của bạn. Không bao gồm chi phí di chuyển
                  từ bạn tới điểm xuất phát.
                </div>
              </div>
            </motion.div>

            <motion.div custom={3} variants={fadeIn} initial="hidden" animate="visible">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-secondary to-secondary/85 text-white font-bold py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                Gửi yêu cầu
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
