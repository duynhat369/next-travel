import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import { LoginFormValues } from '@/lib/schemas/auth';
import { motion } from 'framer-motion';
import { AlertCircle, Lock, User } from 'lucide-react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';

interface Props {
  registerLogin: UseFormRegister<LoginFormValues>;
  loginErrors: FieldErrors<LoginFormValues>;
  isLoginSubmitting: boolean;
  onLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onGoogleLogin: () => void;
}

export const LoginForm = ({
  registerLogin,
  loginErrors,
  isLoginSubmitting,
  onLoginSubmit,
  onGoogleLogin,
}: Props) => {
  return (
    <TabsContent value="login">
      <motion.div
        key="login"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md mx-auto border-muted shadow-xl bg-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Đăng nhập</CardTitle>
            <CardDescription className="text-center text-md text-foreground/70">
              Điền thông tin để đăng nhập
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="login-form" onSubmit={onLoginSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="login-username">Tên đăng nhập</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-username"
                    className="pl-9"
                    placeholder="Nhập tên đăng nhập"
                    {...registerLogin('username')}
                  />
                </div>
                {loginErrors.username && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {loginErrors.username.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Mật khẩu</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type="password"
                    className="px-9"
                    placeholder="Nhập mật khẩu"
                    {...registerLogin('password')}
                  />
                </div>
                {loginErrors.password && (
                  <p className="text-sm text-red-500">{loginErrors.password.message}</p>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              type="submit"
              form="login-form"
              disabled={isLoginSubmitting}
              className="w-full h-fit bg-foreground hover:bg-foreground-secondary text-white text-xl cursor-pointer"
            >
              {isLoginSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
            <div className="w-full flex items-center my-4">
              <Separator className="flex-1" />
              <span className="px-4 text-sm text-foreground">Hoặc</span>
              <Separator className="flex-1" />
            </div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 transition-colors border-border bg-white hover:bg-background text-foreground cursor-pointer"
              onClick={onGoogleLogin}
            >
              <FcGoogle className="w-12 h-12" />
              Đăng nhập với Google
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </TabsContent>
  );
};
