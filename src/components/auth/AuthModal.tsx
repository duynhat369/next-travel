'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { authApi } from '@/lib/api/auth';
import { AxiosError } from '@/lib/models/Error';
import {
  LoginFormValues,
  loginSchema,
  RegisterFormValues,
  registerSchema,
} from '@/lib/schemas/auth';
import { LogIn, UserPlus } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

export function AuthModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
    setError,
    reset,
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

  const { mutate: login } = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data, variables) => {
      const res = await signIn('credentials', {
        username: variables.username,
        password: variables.password,
        redirect: false,
      });
      if (!res?.ok) {
        throw new Error(res.error || 'Error logging in after registration');
      }
      // Close the modal
      setOpen(false);
      reset();
      // Refresh the page to update the UI
      router.refresh();
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        const { message } = axiosError.response.data;
        toast('Đăng nhập không thành công', {
          description: message || 'Có lỗi xảy ra',
        });
      } else
        toast('Đăng nhập không thành công', {
          description: error instanceof Error ? (error as Error).message : 'Có lỗi xảy ra',
        });

      console.log(error);
    },
  });
  const { mutate: register } = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data, variables) => {
      toast('Đăng ký thành công', {
        description: 'Bạn có thể đăng nhập ngay',
        action: {
          label: 'Đăng nhập',
          onClick: async () => {
            const res = await signIn('credentials', {
              username: variables.username,
              password: variables.password,
              redirect: false,
            });
            if (!res?.ok) {
              throw new Error(res.error || 'Error logging in after registration');
            }
          },
        },
      });
      // Close the modal
      setOpen(false);
      reset();
      // Refresh the page to update the UI
      router.refresh();
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.data) {
        const { message, fieldErrors } = axiosError.response.data;

        if (fieldErrors) {
          if (fieldErrors.email) {
            setError('email', {
              type: 'manual',
              message: fieldErrors.email[0] || 'Email này đã được sử dụng',
            });
          }
          if (fieldErrors.username) {
            setError('username', {
              type: 'manual',
              message: fieldErrors.username[0] || 'Tên đăng nhập này đã tồn tại',
            });
          }
        }

        toast('Đăng ký không thành công', {
          description: message || 'Có lỗi xảy ra',
        });
      } else {
        toast('Đăng ký không thành công', {
          description: error instanceof Error ? (error as Error).message : 'Có lỗi xảy ra',
        });
      }
    },
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    login(data);
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    register(data);
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      toast('Đăng nhập thất bại', {
        description: 'Có lỗi xảy ra khi đăng nhập với Google',
      });
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
          <DialogDescription className="flex flex-col gap-4 text-foreground sr-only"></DialogDescription>
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
            onGoogleLogin={handleGoogleLogin}
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
