import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { LoginFormValues } from '../AuthModal';

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
          </CardContent>
        </Card>
      </motion.div>
    </TabsContent>
  );
};
