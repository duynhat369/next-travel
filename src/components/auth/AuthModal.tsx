'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/auth';
import { LogIn, UserPlus } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LoginForm } from './components/LoginForm';
// import { useToast } from "@/components/ui/use-toast";

// Login form schema
const loginSchema = z.object({
  username: z.string().min(3, { message: 'Tên đăng nhập phải có ít nhất 3 ký tự' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Register form schema
const registerSchema = z
  .object({
    username: z.string().min(3, { message: 'Tên đăng nhập phải có ít nhất 3 ký tự' }),
    displayName: z.string().min(2, { message: 'Tên hiển thị phải có ít nhất 2 ký tự' }),
    email: z.string().email({ message: 'Email không hợp lệ' }),
    phoneNumber: z.string().optional(),
    password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    confirmPassword: z.string().min(6, { message: 'Mật khẩu xác nhận phải có ít nhất 6 ký tự' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function AuthModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  //   const { toast } = useToast();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const {
    register: registerSignup,
    handleSubmit: handleSubmitRegister,
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      displayName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Đăng nhập thất bại');
      }

      // Set user in Zustand store
      setUser(result.user);

      setOpen(false);

      //   toast({
      //     title: "Đăng nhập thành công",
      //     description: `Chào mừng trở lại, ${result.user.displayName}!`,
      //   });
      console.log('Đăng nhập thành công');

      // Refresh the page to update the UI
      router.refresh();
    } catch (error) {
      //   toast({
      //     title: "Đăng nhập thất bại",
      //     description: error instanceof Error ? error.message : "Có lỗi xảy ra",
      //     variant: "destructive",
      //   });
      console.log('Đăng nhập thất bại');
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Đăng ký thất bại');
      }

      //   toast({
      //     title: "Đăng ký thành công",
      //     description: "Bạn có thể đăng nhập ngay bây giờ!",
      //   });
      console.log('Đăng ký thành công');

      // Optional: Auto login after register
      await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      // Set user in Zustand store
      setUser(result.user);

      // Close the modal
      setOpen(false);

      // Refresh the page to update the UI
      router.refresh();
    } catch (error) {
      //   toast({
      //     title: "Đăng ký thất bại",
      //     description: error instanceof Error ? error.message : "Có lỗi xảy ra",
      //     variant: "destructive",
      //   });
      console.log('Đăng ký thất bại');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log('️🏆️🏆️ google');
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      //   toast({
      //     title: "Đăng nhập thất bại",
      //     description: "Có lỗi xảy ra khi đăng nhập với Google",
      //     variant: "destructive",
      //   });
      console.log('Đăng nhập thất bại');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="text" className="p-0 hover:text-secondary transition-colors rounded-full">
          Đăng nhập/ Đăng ký
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-white border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl mb-4">Tài khoản</DialogTitle>
          <DialogDescription className="flex flex-col gap-4 text-foreground">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 transition-colors bg-foreground text-white cursor-pointer hover:bg-foreground-secondary hover:text-white"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="w-12 h-12" />
              Đăng nhập với Google
            </Button>
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full mt-4 gap-4">
          <TabsList className="grid grid-cols-2 w-full gap-4 h-12">
            <TabsTrigger
              value="login"
              className="flex gap-2 transition-colors hover:text-secondary data-[state=active]:bg-secondary data-[state=active]:text-white cursor-pointer"
            >
              <LogIn size={16} /> Đăng nhập
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="flex gap-2 transition-colors hover:text-secondary data-[state=active]:bg-secondary data-[state=active]:text-white cursor-pointer"
            >
              <UserPlus size={16} /> Đăng ký
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <LoginForm
              registerLogin={registerLogin}
              loginErrors={loginErrors}
              isLoginSubmitting={isLoginSubmitting}
              onLoginSubmit={handleSubmitLogin(onLoginSubmit)}
            />

            <TabsContent key="register" value="register">
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Đăng ký</CardTitle>
                    <CardDescription>Điền thông tin để tạo tài khoản</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form id="register-form" onSubmit={handleSubmitRegister(onRegisterSubmit)}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="register-username">Tên đăng nhập</Label>
                          <Input
                            id="register-username"
                            placeholder="Nhập tên đăng nhập"
                            {...registerSignup('username')}
                          />
                          {registerErrors.username && (
                            <p className="text-sm text-red-500">
                              {registerErrors.username.message}
                            </p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="register-display-name">Tên hiển thị</Label>
                          <Input
                            id="register-display-name"
                            placeholder="Nhập tên hiển thị"
                            {...registerSignup('displayName')}
                          />
                          {registerErrors.displayName && (
                            <p className="text-sm text-red-500">
                              {registerErrors.displayName.message}
                            </p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="register-email">Email</Label>
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="Nhập email"
                            {...registerSignup('email')}
                          />
                          {registerErrors.email && (
                            <p className="text-sm text-red-500">{registerErrors.email.message}</p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="register-phone">Số điện thoại (tùy chọn)</Label>
                          <Input
                            id="register-phone"
                            placeholder="Nhập số điện thoại"
                            {...registerSignup('phoneNumber')}
                          />
                          {registerErrors.phoneNumber && (
                            <p className="text-sm text-red-500">
                              {registerErrors.phoneNumber.message}
                            </p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="register-password">Mật khẩu</Label>
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            {...registerSignup('password')}
                          />
                          {registerErrors.password && (
                            <p className="text-sm text-red-500">
                              {registerErrors.password.message}
                            </p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="register-confirm-password">Xác nhận mật khẩu</Label>
                          <Input
                            id="register-confirm-password"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            {...registerSignup('confirmPassword')}
                          />
                          {registerErrors.confirmPassword && (
                            <p className="text-sm text-red-500">
                              {registerErrors.confirmPassword.message}
                            </p>
                          )}
                        </div>
                        <Button type="submit" disabled={isRegisterSubmitting} className="w-full">
                          {isRegisterSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
