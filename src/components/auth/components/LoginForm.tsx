import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import { LoginFormValues } from '@/lib/schemas/auth';
import { motion } from 'framer-motion';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';

interface Props {
  registerLogin: UseFormRegister<LoginFormValues>;
  loginErrors: FieldErrors<LoginFormValues>;
  isLoginSubmitting: boolean;
  onLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm = ({
  registerLogin,
  loginErrors,
  isLoginSubmitting,
  onLoginSubmit,
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
        <Card className="w-full max-w-md mx-auto border-border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Đăng nhập</CardTitle>
            <CardDescription className="text-center">Điền thông tin để đăng nhập</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="login-form" onSubmit={onLoginSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="login-username">Tên đăng nhập</Label>
                  <Input
                    id="login-username"
                    placeholder="Nhập tên đăng nhập"
                    {...registerLogin('username')}
                  />
                  {loginErrors.username && (
                    <p className="text-sm text-red-500">{loginErrors.username.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login-password">Mật khẩu</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    {...registerLogin('password')}
                  />
                  {loginErrors.password && (
                    <p className="text-sm text-red-500">{loginErrors.password.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoginSubmitting}
                  className="w-full h-fit bg-foreground hover:bg-foreground-secondary text-white text-xl cursor-pointer"
                >
                  {isLoginSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </div>
            </form>
            <div className="flex items-center my-4">
              <Separator className="flex-1" />
              <span className="px-4 text-sm text-foreground">Hoặc</span>
              <Separator className="flex-1" />
            </div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 transition-colors bg-foreground text-white cursor-pointer hover:bg-foreground-secondary hover:text-white"
              // onClick={handleGoogleLogin}
            >
              <FcGoogle className="w-12 h-12" />
              Đăng nhập với Google
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </TabsContent>
  );
};
