// src/types/next-auth.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Mở rộng các thuộc tính User
   */
  interface User {
    id: string;
    username: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    avatar?: string;
  }
  /**
   * Mở rộng thuộc tính session.user
   */
  interface Session {
    user: {
      id: string;
      username: string;
      displayName: string;
      avatar?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /**
   * Mở rộng thuộc tính token JWT
   */
  interface JWT {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
  }
}
