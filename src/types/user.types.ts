export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  avatar: string;
}
export interface RegisterResponse {
  success: boolean;
  message: string;
  user: User;
}
export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
}
export interface ErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
