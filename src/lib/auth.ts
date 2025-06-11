import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/lib/models/User';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Vui lòng nhập tên đăng nhập và mật khẩu');
        }

        await connectToDatabase();

        const user = await User.findOne({ username: credentials.username }).select('+password');
        if (!user) throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác');

        const isPasswordValid = await user.comparePassword(credentials.password);
        if (!isPasswordValid) throw new Error('Tên đăng nhập hoặc mật khẩu không chính xác');

        user.lastLogin = new Date();
        await user.save();

        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          displayName: user.displayName,
          avatar: user.avatar,
          phoneNumber: user?.phoneNumber || '',
        };
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      async profile(profile) {
        return {
          id: profile.sub,
          username: profile.email.split('@')[0],
          email: profile.email,
          displayName: profile.name,
          avatar: profile.picture,
          phoneNumber: profile?.phoneNumber || '',
          provider: 'google',
        };
      },
    }),
  ],
  pages: {
    signIn: '/',
    error: '/',
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = (user as any)._id?.toString() || user.id;
        token.username = user.username;
        token.displayName = user.displayName;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.displayName = token.displayName as string;
        session.user.avatar = token.avatar as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          await connectToDatabase();
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            if (existingUser.provider !== 'google') {
              existingUser.provider = 'google';
              existingUser.googleId = user.id;
              existingUser.avatar = user.avatar || existingUser.avatar;
              existingUser.lastLogin = new Date();
              await existingUser.save();
            }
            user.id = existingUser._id.toString();
          } else {
            const newUser = await User.create({
              username: user.username || user.email?.split('@')[0],
              displayName: user.name || profile?.name || 'User',
              email: user.email,
              password: Math.random().toString(36).slice(-12),
              avatar: user.avatar || profile?.image,
              provider: 'google',
              googleId: user.id,
            });
            user.id = newUser._id.toString();
          }
        } catch (error) {
          console.error('Google Sign In Error:', error);
          return false;
        }
      }

      return true;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET!,
});
