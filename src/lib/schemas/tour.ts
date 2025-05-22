import { z } from 'zod';

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
