'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UserDB } from '@/lib/api/user';
import { userApi } from '@/lib/api/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { AlertCircle, Check, Edit2, Loader2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface Props {
  user: UserDB;
  isEditingPhone?: boolean;
  onEditPhone?: () => void;
  onSuccess: () => void;
  onCancel: () => void;
}

const phoneFormSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, 'Số điện thoại phải có ít nhất 10 ký tự')
    .max(15, 'Số điện thoại không được quá 15 ký tự')
    .regex(/^[0-9+\-\s()]+$/, 'Số điện thoại không hợp lệ')
    .optional()
    .or(z.literal('')),
});

type PhoneFormValues = z.infer<typeof phoneFormSchema>;

export const UserDetail = ({ user, isEditingPhone, onEditPhone, onCancel, onSuccess }: Props) => {
  const queryClient = useQueryClient();

  // Form setup với React Hook Form và Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phoneNumber: user.phoneNumber || '',
    },
  });

  // Mutation để cập nhật số điện thoại
  const { mutate: updatePhone, isPending } = useMutation({
    mutationFn: async (data: PhoneFormValues) => {
      return userApi.updateProfile(user._id as string, {
        phoneNumber: data.phoneNumber || '',
      });
    },
    onSuccess: () => {
      // Invalidate và refetch
      queryClient.invalidateQueries({ queryKey: ['user', user._id] });
      toast.success('Cập nhật số điện thoại thành công');
      onSuccess();
    },
    onError: (error: unknown) => {
      toast.error('Cập nhật thất bại', {
        description:
          error instanceof Error ? error.message : 'Có lỗi xảy ra khi cập nhật số điện thoại',
      });
    },
  });

  const onSubmit = (data: PhoneFormValues) => {
    updatePhone(data);
  };

  const accountType = user.provider === 'google' ? 'Google' : 'Latata';
  const accountTypeColor =
    user.provider === 'google' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700';

  // Xác định loại user (role)
  const userLabel = user.role === 'user' ? 'Khách hàng' : 'Admin';
  const userRoleColor =
    user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700';

  // Format ngày đăng ký
  const formattedDate = user.createdAt
    ? format(new Date(user.createdAt), 'dd/MM/yyyy')
    : 'Không có thông tin';

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Email */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center gap-2 text-gray-500">
            <span>Email</span>
          </div>
          <span className="text-foreground font-medium">{user.email}</span>
        </div>

        {isEditingPhone ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phoneNumber" className="text-gray-500 text-base font-normal">
                Số điện thoại
              </Label>
              <div className="flex gap-2">
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  className="flex-1 bg-white border-gray-200"
                  {...register('phoneNumber')}
                />
                <div className="flex gap-1">
                  <Button
                    type="submit"
                    disabled={!isDirty || isPending}
                    className="px-3 border bg-transparent border-none shadow-none cursor-pointer hover:bg-secondary/10"
                  >
                    {isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    ) : (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={onCancel}
                    disabled={isPending}
                    className="px-3 border bg-transparent border-none shadow-none cursor-pointer hover:bg-primary/10"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              {errors.phoneNumber && (
                <div className="text-sm text-red-500 flex items-center gap-1.5 mt-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.phoneNumber.message}
                </div>
              )}
            </div>
          </form>
        ) : (
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center gap-4">
              <span className="text-gray-500">Số điện thoại</span>
              <Button
                onClick={onEditPhone}
                className="h-auto text-primary hover:text-primary/80 hover:bg-primary/10 bg-transparent border-none shadow-none cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
            <span className="text-foreground">
              {user.phoneNumber || 'Chưa cập nhật số điện thoại'}
            </span>
          </div>
        )}
      </div>

      {/* Loại tài khoản */}
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center gap-2 text-gray-500">
          <span>Loại tài khoản</span>
        </div>
        <div>
          <Badge variant="outline" className={`${accountTypeColor} border-0`}>
            {accountType}
          </Badge>
        </div>
      </div>

      {/* Vai trò */}
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center gap-2 text-gray-500">
          <span>Vai trò</span>
        </div>
        <div>
          <Badge variant="outline" className={`${userRoleColor} border-0 capitalize`}>
            {userLabel}
          </Badge>
        </div>
      </div>

      {/* Ngày đăng ký */}
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center gap-2 text-gray-500">
          <span>Ngày đăng ký</span>
        </div>
        <span className="text-foreground">{formattedDate}</span>
      </div>
    </div>
  );
};
