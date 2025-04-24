'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import axiosClient from '@/lib/axios';
import {
  LoginFormValues,
  loginSchema,
  RegisterFormValues,
  registerSchema,
} from '@/lib/schemas/auth';
import { useAuthStore } from '@/store/auth';
import { LogIn, UserPlus } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
// import { useToast } from "@/components/ui/use-toast";

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
    watch,
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
  const passwordSignUpWatch = watch('password');

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
    console.log('️🏆️🏆️ data:', data);
    try {
      const { data: result } = await axiosClient.post('/auth/register', data);

      console.log('️🏆️🏆️ result:', result);

      //   toast({
      //     title: "Đăng ký thành công",
      //     description: "Bạn có thể đăng nhập ngay bây giờ!",
      //   });

      // // Optional: Auto login after register
      // const res = await signIn('credentials', {
      //   username: data.username,
      //   password: data.password,
      //   redirect: false,
      // });
      // if (!res?.ok) {
      //   throw new Error(res.error || 'Error logging in after registration');
      // }

      // // Set user in Zustand store
      // setUser(result.user);

      // // Close the modal
      // setOpen(false);

      // // Refresh the page to update the UI
      // router.refresh();
      console.log('Đăng ký thành công');
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

      <DialogContent className="max-h-[95vh] pt-12 overflow-y-auto sm:max-w-[500px] bg-white border-none shadow-2xl gap-0">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl mb-4 sr-only">Tài khoản</DialogTitle>
          <DialogDescription className="flex flex-col gap-4 text-foreground sr-only">
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

        <Tabs defaultValue="login" className="w-full gap-4">
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

          <LoginForm
            key={'login'}
            registerLogin={registerLogin}
            loginErrors={loginErrors}
            isLoginSubmitting={isLoginSubmitting}
            onLoginSubmit={handleSubmitLogin(onLoginSubmit)}
          />
          <RegisterForm
            key={'register'}
            password={passwordSignUpWatch}
            registerSignup={registerSignup}
            registerErrors={registerErrors}
            isRegisterSubmitting={isRegisterSubmitting}
            onRegisterSubmit={handleSubmitRegister(onRegisterSubmit)}
          />
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
