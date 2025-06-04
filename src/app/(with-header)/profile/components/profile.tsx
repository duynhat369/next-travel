'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Camera, Edit2, Mail, Phone, Save, User2, X } from 'lucide-react';
import { User } from 'next-auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserTabs } from './user-tabs';

interface ProfileClientProps {
  user?: User;
  canEdit?: boolean;
  currentUser: any;
}

export function Profile({ user, canEdit, currentUser }: ProfileClientProps) {
  console.log('️🏆️🏆️ user:', user);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<any>({
    // resolver: zodResolver(),
    defaultValues: {
      email: user?.email,
      phone: user?.phoneNumber || '',
    },
  });

  const { mutate: updateProfile, isPending } = useMutation({
    // mutationFn: userApi.updateProfile,
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries({ queryKey: ["user", user?._id] })
    //   setIsEditing(false)
    //   reset(data.user)
    //   toast.success("Cập nhật thông tin thành công")
    // },
    // onError: (error: any) => {
    //   toast.error("Cập nhật thất bại", {
    //     description: error.response?.data?.error || "Có lỗi xảy ra",
    //   })
    // },
  });

  const handleSave = (data: any) => {
    // updateProfile({
    //   userId: user?._id,
    //   data,
    // })
  };

  const handleCancel = () => {
    // reset({
    //   email: user?.email,
    //   phone: user?.phone || "",
    // })
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20 md:mt-28">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">Thông tin cá nhân</h1>
              {/* {canEdit && !isEditing && ( */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Chỉnh sửa
              </Button>
              {/* )} */}
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-32 h-32">
                      <AvatarImage
                        src={user?.avatar || '/placeholder.svg'}
                        alt={user?.displayName}
                      />
                      <AvatarFallback className="text-2xl font-semibold">
                        {getInitials(user?.displayName || 'User')}
                      </AvatarFallback>
                    </Avatar>
                    {true && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-lg"
                      >
                        <Camera className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-foreground">{user?.displayName}</h2>
                  </div>
                </div>

                {/* User Info Section */}
                <div className="flex-1 space-y-6">
                  {/* Display Name - Read Only */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <User2 className="w-4 h-4" />
                      Tên hiển thị
                    </Label>
                    <div className="p-3 bg-gray-100 rounded-lg border">
                      <span className="text-foreground">{user?.displayName}</span>
                    </div>
                  </div>

                  {/* Email - Editable */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    {isEditing && canEdit ? (
                      <div>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          className="w-full"
                          placeholder="Nhập email của bạn"
                        />
                        {/* {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>} */}
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-100 rounded-lg border">
                        <span className="text-foreground">{user?.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone - Editable */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                      <Phone className="w-4 h-4" />
                      Số điện thoại
                    </Label>
                    {isEditing && canEdit ? (
                      <div>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          className="w-full"
                          placeholder="Nhập số điện thoại"
                        />
                        {/* {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>} */}
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-100 rounded-lg border">
                        <span className="text-foreground">
                          {user?.phoneNumber || 'Chưa cập nhật'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {isEditing && canEdit && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 pt-4"
                    >
                      <Button
                        type="submit"
                        disabled={!isDirty || isPending}
                        className="flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isPending}
                        className="flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Hủy
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <UserTabs />
    </div>
  );
}
