import { LoginResponse, RegisterResponse } from '@/types/user.types';
import axiosClient from '../axios';
import { LoginFormValues, RegisterFormValues } from '../schemas/auth';

export const authApi = {
  register: (data: RegisterFormValues): Promise<RegisterResponse> =>
    axiosClient.post('/auth/register', data),
  login: (data: LoginFormValues): Promise<LoginResponse> => axiosClient.post('/auth/login', data),
};
