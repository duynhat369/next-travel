'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Camera, Edit2, Mail, Phone, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProfileClientProps {
  user: any;
  canEdit?: boolean;
  currentUser: any;
}

export function Profile({ user, canEdit, currentUser }: ProfileClientProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('cart');
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
      email: user.email,
      phone: user.phone || '',
    },
  });

  const { mutate: updateProfile, isPending } = useMutation({
    // mutationFn: userApi.updateProfile,
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries({ queryKey: ["user", user._id] })
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
    //   userId: user._id,
    //   data,
    // })
  };

  const handleCancel = () => {
    // reset({
    //   email: user.email,
    //   phone: user.phone || "",
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
                {canEdit && !isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Chỉnh sửa
                  </Button>
                )}
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
                          src={user.avatar || '/placeholder.svg'}
                          alt={user.displayName}
                        />
                        <AvatarFallback className="text-2xl font-semibold">
                          {getInitials(user.displayName)}
                        </AvatarFallback>
                      </Avatar>
                      {canEdit && isEditing && (
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
                      <h2 className="text-xl font-semibold text-foreground">{user.displayName}</h2>
                      <p className="text-sm text-foreground-secondary">
                        Thành viên từ {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>

                  {/* User Info Section */}
                  <div className="flex-1 space-y-6">
                    {/* Display Name - Read Only */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <X className="w-4 h-4" />
                        Tên hiển thị
                      </Label>
                      <div className="p-3 bg-gray-100 rounded-lg border">
                        <span className="text-foreground">{user.displayName}</span>
                      </div>
                    </div>

                    {/* Email - Editable */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2 text-sm font-medium"
                      >
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
                          <span className="text-foreground">{user.email}</span>
                        </div>
                      )}
                    </div>

                    {/* Phone - Editable */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="flex items-center gap-2 text-sm font-medium"
                      >
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
                          <span className="text-foreground">{user.phone || 'Chưa cập nhật'}</span>
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

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b border-gray-200">
                  <TabsList className="grid w-full grid-cols-2 bg-transparent h-auto p-0 rounded-none">
                    <TabsTrigger
                      value="cart"
                      className="relative py-4 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 font-medium"
                      >
                        <span>🛒</span>
                        Giỏ hàng
                      </motion.div>
                    </TabsTrigger>
                    <TabsTrigger
                      value="booking-history"
                      className="relative py-4 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 font-medium"
                      >
                        <span>📋</span>
                        Lịch sử booking
                      </motion.div>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  <TabsContent value="cart" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-12"
                    >
                      <div className="text-6xl mb-4">🛒</div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">Giỏ hàng</h3>
                      <p className="text-foreground-secondary">
                        Nội dung giỏ hàng sẽ được hiển thị ở đây
                      </p>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="booking-history" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-12"
                    >
                      <div className="text-6xl mb-4">📋</div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Lịch sử booking
                      </h3>
                      <p className="text-foreground-secondary">
                        Lịch sử đặt tour sẽ được hiển thị ở đây
                      </p>
                    </motion.div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
