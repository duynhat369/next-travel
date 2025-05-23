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
import { Progress } from '@/components/ui/progress';
import { TabsContent } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RegisterFormValues } from '@/lib/schemas/auth';
import { cn } from '@/lib/utils';
import { getPasswordStrength } from '@/utils/password';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, Lock, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Props {
  password: string;

  registerSignup: UseFormRegister<RegisterFormValues>;
  registerErrors: FieldErrors<RegisterFormValues>;
  isRegisterSubmitting: boolean;
  onRegisterSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RequiredLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="flex items-center gap-1">
    {children} <span className="text-red-500">*</span>
  </span>
);

export const RegisterForm = ({
  password,
  onRegisterSubmit,
  registerErrors,
  registerSignup,
  isRegisterSubmitting,
}: Props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const passwordStrength = getPasswordStrength(password);

  return (
    <TabsContent value="register">
      <motion.div
        key="register"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md mx-auto border-muted shadow-xl bg-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Đăng ký</CardTitle>
            <CardDescription className="text-center text-md text-foreground/70">
              Điền thông tin để tạo tài khoản mới
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="register-form" onSubmit={onRegisterSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-1.5">
                  <RequiredLabel>Tên đăng nhập</RequiredLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chỉ chứa chữ cái và chữ số, 3-30 ký tự</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    className="pl-9"
                    placeholder="Nhập tên đăng nhập"
                    maxLength={20}
                    {...registerSignup('username')}
                  />
                </div>
                {registerErrors.username && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {registerErrors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName">
                  <RequiredLabel>Tên hiển thị</RequiredLabel>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="displayName"
                    className="pl-9"
                    placeholder="Nhập tên hiển thị"
                    maxLength={30}
                    {...registerSignup('displayName')}
                  />
                </div>
                {registerErrors.displayName && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {registerErrors.displayName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <RequiredLabel>Email</RequiredLabel>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-9"
                    placeholder="Nhập email"
                    {...registerSignup('email')}
                  />
                </div>
                {registerErrors.email && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {registerErrors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phoneNumber"
                    className="pl-9"
                    placeholder="Nhập số điện thoại"
                    {...registerSignup('phoneNumber')}
                  />
                </div>
                {registerErrors.phoneNumber && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {registerErrors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  <RequiredLabel>Mật khẩu</RequiredLabel>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={passwordVisible ? 'text' : 'password'}
                    className="px-9"
                    placeholder="Nhập mật khẩu"
                    {...registerSignup('password')}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" x2="22" y1="2" y2="22"></line>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
                {password && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Độ mạnh:</span>
                      <span
                        className={`font-medium ${
                          passwordStrength.strength < 40
                            ? 'text-red-500'
                            : passwordStrength.strength < 60
                            ? 'text-orange-500'
                            : passwordStrength.strength < 80
                            ? 'text-yellow-500'
                            : 'text-green-500'
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <Progress
                      value={passwordStrength.strength}
                      className={cn('h-1.5 bg-muted')}
                      indicatorClassName={passwordStrength.color}
                    />
                    <ul className="text-xs space-y-1 mt-2">
                      <li
                        className={`flex items-center gap-1 ${
                          password.length >= 6 ? 'text-green-500' : 'text-muted-foreground'
                        }`}
                      >
                        {password.length >= 6 ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        Ít nhất 6 ký tự
                      </li>
                      <li
                        className={`flex items-center gap-1 ${
                          /[A-Z]/.test(password) ? 'text-green-500' : 'text-muted-foreground'
                        }`}
                      >
                        {/[A-Z]/.test(password) ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        Có ít nhất 1 chữ hoa
                      </li>
                      <li
                        className={`flex items-center gap-1 ${
                          /[0-9]/.test(password) ? 'text-green-500' : 'text-muted-foreground'
                        }`}
                      >
                        {/[0-9]/.test(password) ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        Có ít nhất 1 chữ số
                      </li>
                    </ul>
                  </div>
                )}
                {registerErrors.password && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {registerErrors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  <RequiredLabel>Xác nhận mật khẩu</RequiredLabel>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    className="px-9"
                    placeholder="Nhập lại mật khẩu"
                    {...registerSignup('confirmPassword')}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  >
                    {confirmPasswordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" x2="22" y1="2" y2="22"></line>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
                {registerErrors.confirmPassword && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {registerErrors.confirmPassword.message}
                  </p>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              form="register-form"
              disabled={isRegisterSubmitting}
              className="w-full h-fit bg-foreground hover:bg-foreground-secondary text-white text-xl cursor-pointer"
            >
              {isRegisterSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang đăng ký...
                </>
              ) : (
                'Đăng ký'
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </TabsContent>
  );
};
