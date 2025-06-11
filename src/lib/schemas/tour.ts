import { Tour } from '@/types/tour.types';
import mongoose from 'mongoose';
import { z } from 'zod';

const tourSchema = new mongoose.Schema<Tour>(
  {
    title: { type: String, required: true },
    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    isHot: { type: Boolean, default: false },
    itinerary: { type: String },
    whatToBring: { type: [String] },
    guides: [
      {
        name: String,
        avatar: String,
        bio: String,
      },
    ],
    gallery: { type: [String] },
  },
  { timestamps: true }
);

export function getTourModel() {
  return mongoose.models.Tour || mongoose.model<Tour>('Tour', tourSchema);
}

export const bookingSchema = z.object({
  quantity: z
    .number({ invalid_type_error: 'Số lượng phải là số' })
    .int('Số lượng phải là số nguyên')
    .positive('Số lượng phải lớn hơn 0')
    .min(1, 'Tối thiểu phải có 1 người'),
  date: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine((val) => val.from && val.to, {
      message: 'Vui lòng chọn đầy đủ ngày bắt đầu và kết thúc.',
    }),
  phoneNumber: z.string().nonempty('Nhập số điện thoại'),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
