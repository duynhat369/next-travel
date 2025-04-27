import { RegisterResponse } from '@/types/user.types';
import axiosClient from '../axios';
import { RegisterFormValues } from '../schemas/auth';

export const authApi = {
  register: (data: RegisterFormValues): Promise<RegisterResponse> =>
    axiosClient.post('/auth/register', data),
};
