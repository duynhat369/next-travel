import { z } from 'zod';

// Register schema
export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
      .max(30, 'Tên đăng nhập không được quá 30 ký tự')
      .regex(/^[a-zA-Z0-9]+$/, 'Tên đăng nhập chỉ được chứa chữ cái và chữ số')
      .nonempty('Tên đăng nhập là bắt buộc'),
    displayName: z
      .string()
      .min(2, 'Tên hiển thị phải có ít nhất 2 ký tự')
      .max(30, 'Tên đăng nhập không được quá 30 ký tự')
      .nonempty('Tên hiển thị là bắt buộc'),
    email: z.union([z.literal(''), z.string().email('Email không hợp lệ')]),
    phoneNumber: z.string().optional(),
    password: z
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .nonempty('Mật khẩu là bắt buộc'),
    confirmPassword: z.string().nonempty('Xác nhận mật khẩu là bắt buộc'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

// Login schema
export const loginSchema = z.object({
  username: z.string().nonempty('Vui lòng nhập tên đăng nhập'),
  password: z.string().nonempty('Vui lòng nhập mật khẩu'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
