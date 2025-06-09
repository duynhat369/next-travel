import mongoose from 'mongoose';
import axiosClient from '../axios';

export interface UserDB {
  _id: string | mongoose.ObjectId;
  username: string;
  displayName: string;
  email?: string;
  avatar?: string;
  phoneNumber?: string;
  role: string;
  provider: string;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UpdateUserRequest {
  phoneNumber: string;
}

export interface UpdateUserResponse {
  success: boolean;
  user: UserDB;
  message: string;
}
export interface GetUserResponse {
  success: boolean;
  user: UserDB;
}

export const userApi = {
  // Lấy thông tin user
  getProfile: async (userId: string): Promise<GetUserResponse> => {
    return axiosClient.get(`/users/${userId}`);
  },

  // Cập nhật thông tin user
  updateProfile: async (userId: string, data: UpdateUserRequest): Promise<UpdateUserResponse> => {
    return axiosClient.put(`/users/${userId}`, data);
  },

  // Cập nhật avatar
  updateAvatar: async (userId: string, avatar: File): Promise<UpdateUserResponse> => {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return axiosClient.put(`/users/${userId}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
