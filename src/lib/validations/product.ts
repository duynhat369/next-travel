import { z } from 'zod';

export const addProductSchema = z.object({
  name: z.string().min(1, 'Nhập tên sản phẩm'),
  description: z.string().min(1, 'Nhập mô tả'),
  content: z.string().optional(),
  originalPrice: z.number({ message: 'Nhập giá hợp lệ' }).min(0, 'Giá gốc phải lớn hơn 0'),
  price: z.number(),
  discountPercentage: z.number().min(0).max(100, 'Nằm trong khoảng 0 - 100').optional(),
  thumbnail: z.string().min(1, 'Vui lòng tải ảnh cho sản phẩm'),
  gallery: z.array(z.string()).max(10, 'Tối đa 10 ảnh'),
  categoryType: z
    .array(z.enum(['souvenir', 'camping', 'clothing', 'motor']))
    .min(1, 'Chọn ít nhất 1 danh mục'),
  stock: z.number({ message: 'Nhập số lượng hợp lệ' }).optional(),
  tags: z.array(z.string()),
  limited: z.boolean().optional(),
  freeShip: z.boolean().optional(),
});

export type ProductFormData = z.infer<typeof addProductSchema>;
